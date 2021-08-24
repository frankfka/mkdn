import React, {
  createContext,
  MutableRefObject,
  SetStateAction,
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
import { encryptMarkdown } from '../util/markdownEncryption';
import {
  getEditorSettingsFromLocalStorage,
  getMarkdownDataFromLocalStorage,
  saveEditorSettingsToLocalStorage,
  saveMarkdownDataToLocalStorage,
} from '../../util/localStorageUtils';
import EditorSettings from '../../types/EditorSettings';

type EditorState = MarkdownFileData;

type EditorContextData = {
  isInitialized: boolean;
  // Saved in localstorage
  savedEditorState?: EditorState;
  editorSettings?: EditorSettings;
  setEditorSettings(v: SetStateAction<EditorSettings | undefined>): void;
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
  setEditorSettings() {},
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
  const [editorSettings, setEditorSettings] = useState<EditorSettings>();
  const [isInitialized, setIsInitialized] = useState(false);

  // Editor state
  const [fileName, setFileName] = useState('');
  const [password, setPassword] = useState('');
  const setCleanedPassword = (val: string) => setPassword(val.trim());

  const getEditorValue = useRef<GetEditorValueFn>(() => '');
  const getCurrentEditorState = useCallback((): EditorState => {
    return {
      filename: fileName,
      markdown: getEditorValue.current(),
    };
  }, [fileName]);

  // Load from localstorage to initialize the context
  useEffect(() => {
    // Editor settings
    const editorSettings: EditorSettings =
      getEditorSettingsFromLocalStorage() ?? {
        editorAutosaveEnabled: true,
      };
    setEditorSettings(editorSettings);

    // Editor state
    const defaultEditorState = {
      filename: 'Untitled',
      markdown: '',
    };
    const savedEditorState =
      getMarkdownDataFromLocalStorage() ?? defaultEditorState;
    const editorState: EditorState = editorSettings.editorAutosaveEnabled
      ? savedEditorState
      : defaultEditorState;

    setSavedEditorState(editorState);
    setFileName(editorState.filename);
    getEditorValue.current = () => editorState.markdown;

    setIsInitialized(true);
  }, []);

  // Upload function - returns CID or throws
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

    // Encrypt if password given
    if (!!password) {
      currentState.markdown = encryptMarkdown(currentState.markdown, password);
    }

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

  // Auto-save the current state every 5 seconds if enabled
  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (editorSettings == null || !editorSettings.editorAutosaveEnabled) {
      return;
    }

    const autoSaveInterval = setInterval(() => {
      saveMarkdownDataToLocalStorage(getCurrentEditorState());
    }, 5000);

    return () => clearInterval(autoSaveInterval);
  }, [
    isInitialized,
    editorSettings?.editorAutosaveEnabled,
    getCurrentEditorState,
  ]);

  // Save editor settings when changed
  useEffect(() => {
    if (editorSettings != null) {
      saveEditorSettingsToLocalStorage(editorSettings);
    }
  }, [editorSettings]);

  const contextData: EditorContextData = {
    isInitialized,
    savedEditorState,
    editorSettings,
    setEditorSettings,
    fileName,
    setFileName,
    getEditorValue,
    password,
    setPassword: setCleanedPassword,
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
