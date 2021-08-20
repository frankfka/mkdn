import React, {
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import MarkdownFileData from '../../types/MarkdownFileData';
import callPublishApi from '../util/api/callPublishApi';
import callUploadApi from '../util/api/callUploadApi';
import downloadMarkdownFile from '../util/downloadMarkdownFile';

const EDITOR_LOCALSTORAGE_BASE_KEY = 'mkdn.saved-editor-state';
export const EDITOR_LOCALSTORAGE_FILENAME_KEY = `${EDITOR_LOCALSTORAGE_BASE_KEY}.filename`;
export const EDITOR_LOCALSTORAGE_MARKDOWN_KEY = `${EDITOR_LOCALSTORAGE_BASE_KEY}.markdown`;

type EditorState = MarkdownFileData;

type EditorContextData = {
  isInitialized: boolean;
  // Saved in localstorage
  savedEditorState?: EditorState;
  // Current state
  fileName: string;
  setFileName(val: string): void;
  getEditorValue: MutableRefObject<GetEditorValueFn>;
  password: string;
  setPassword(val: string): void;
  // Functions
  uploadImage(file: File): Promise<string>;
  publishMarkdown(): Promise<string>;
  downloadMarkdown(): void;
};

type GetEditorValueFn = () => string;

export const EditorContext = createContext<EditorContextData>({
  fileName: 'Untitled',
  setFileName() {},
  getEditorValue: { current: () => '' },
  password: '',
  setPassword() {},
  isInitialized: false,
  downloadMarkdown(): void {},
  async publishMarkdown() {
    return '';
  },
  async uploadImage() {
    return '';
  },
});

export const EditorContextProvider: React.FC = ({ children }) => {
  // Init
  const [savedEditorState, setSavedEditorState] = useState<EditorState>();
  const isInitialized = savedEditorState != null;

  // Editor state
  const [fileName, setFileName] = useState('');
  const [password, setPassword] = useState('');
  const getEditorValue = useRef<GetEditorValueFn>(() => '');
  const getCurrentEditorState = useCallback((): EditorState => {
    return {
      filename: fileName,
      markdown: getEditorValue.current(),
    };
  }, [fileName]);

  // Upload function - returns CID or throws (TODO: keep track of current uploads and unpin if needed)
  const uploadImage = async (file: File): Promise<string> => {
    const uploadResponse = await callUploadApi(file);

    if (uploadResponse?.data?.cid) {
      return uploadResponse.data.cid;
    }

    throw Error('No CID in response: ' + JSON.stringify(uploadResponse));
  };

  // Publish function - returns CID or throws
  const publishMarkdown = async (): Promise<string> => {
    const currentState = getCurrentEditorState();

    // TODO: encryption with password: https://www.npmjs.com/package/crypto-js
    const publishResponse = await callPublishApi(currentState);

    if (publishResponse.data?.cid) {
      return publishResponse?.data?.cid;
    }

    throw Error('No CID in response: ' + JSON.stringify(publishResponse));
  };

  // Downloads markdown to device
  const downloadMarkdown = () => {
    const currentState = getCurrentEditorState();
    // Escape backslash newline with newline (seems to be an inconsistency with rich-markdown-editor)
    // This makes the markdown work with Typora (consider removing this?)
    currentState.markdown = currentState.markdown.replace(/\\\n/gi, '\n \n');
    downloadMarkdownFile(currentState);
  };

  // Load from localstorage to initialize the context
  useEffect(() => {
    const savedEditorState = {
      filename:
        localStorage.getItem(EDITOR_LOCALSTORAGE_FILENAME_KEY) ?? 'Untitled',
      markdown: localStorage.getItem(EDITOR_LOCALSTORAGE_MARKDOWN_KEY) ?? '',
    };

    setSavedEditorState(savedEditorState);

    setFileName(savedEditorState.filename);
    getEditorValue.current = () => savedEditorState.markdown;
  }, []);

  // Auto-save the current state every 5 seconds
  const saveCurrentEditorState = useCallback(() => {
    if (!isInitialized) {
      return;
    }
    const currentState = getCurrentEditorState();

    localStorage.setItem(
      EDITOR_LOCALSTORAGE_FILENAME_KEY,
      currentState.filename
    );
    localStorage.setItem(
      EDITOR_LOCALSTORAGE_MARKDOWN_KEY,
      currentState.markdown
    );
  }, [isInitialized, getCurrentEditorState]);
  useEffect(() => {
    const autoSaveInterval = setInterval(saveCurrentEditorState, 5000);

    return () => clearInterval(autoSaveInterval);
  }, [saveCurrentEditorState]);

  const contextData: EditorContextData = {
    isInitialized,
    savedEditorState,
    fileName,
    setFileName,
    getEditorValue,
    password,
    setPassword,
    uploadImage,
    publishMarkdown,
    downloadMarkdown,
  };

  return (
    <EditorContext.Provider value={contextData}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext);
};
