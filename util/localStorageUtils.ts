import MarkdownFileData from '../types/MarkdownFileData';
import EditorSettings from '../types/EditorSettings';

/*
Editor Settings
 */

const EDITOR_SETTINGS_LOCALSTORAGE_KEY = 'mkdn.editor-settings';

export const saveEditorSettingsToLocalStorage = (settings: EditorSettings) => {
  localStorage.setItem(
    EDITOR_SETTINGS_LOCALSTORAGE_KEY,
    JSON.stringify(settings)
  );
};

export const getEditorSettingsFromLocalStorage = ():
  | EditorSettings
  | undefined => {
  const settingsJson = localStorage.getItem(EDITOR_SETTINGS_LOCALSTORAGE_KEY);

  if (!settingsJson) {
    return;
  }

  try {
    return JSON.parse(settingsJson);
  } catch (err) {
    console.error(
      'Error parsing editor settings localstorage JSON',
      settingsJson,
      err
    );
  }
};

/*
Editor State
 */

const EDITOR_LOCALSTORAGE_BASE_KEY = 'mkdn.saved-editor-state';
export const EDITOR_LOCALSTORAGE_FILENAME_KEY = `${EDITOR_LOCALSTORAGE_BASE_KEY}.filename`;
export const EDITOR_LOCALSTORAGE_MARKDOWN_KEY = `${EDITOR_LOCALSTORAGE_BASE_KEY}.markdown`;

export const saveMarkdownDataToLocalStorage = (data: MarkdownFileData) => {
  localStorage.setItem(EDITOR_LOCALSTORAGE_FILENAME_KEY, data.filename);
  localStorage.setItem(EDITOR_LOCALSTORAGE_MARKDOWN_KEY, data.markdown);
};

export const getMarkdownDataFromLocalStorage = ():
  | MarkdownFileData
  | undefined => {
  const filename = localStorage.getItem(EDITOR_LOCALSTORAGE_FILENAME_KEY);
  const markdown = localStorage.getItem(EDITOR_LOCALSTORAGE_MARKDOWN_KEY);

  if (markdown == null || filename == null) {
    return;
  }

  return {
    filename,
    markdown,
  };
};
