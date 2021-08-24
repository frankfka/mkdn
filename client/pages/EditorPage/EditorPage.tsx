import { makeStyles } from '@material-ui/core';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import ShareIcon from '@material-ui/icons/Share';
import React, { useCallback, useState } from 'react';
import { getCidGatewayUrl } from '../../../util/cidUtils';
import {
  checkUploadSize,
  isImageMimeType,
} from '../../../util/fileUploadUtils';
import AppPage from '../../components/AppPage/AppPage';
import InfoDialog from '../../components/InfoDialog/InfoDialog';

import MarkdownEditor from '../../components/MarkdownEditor/MarkdownEditor';
import SpeedDialFab, {
  SpeedDialAction,
} from '../../components/SpeedDialFab/SpeedDialFab';
import Toast, { ToastState } from '../../components/Toast/Toast';
import { useEditorContext } from '../../context/EditorContext';
import DownloadDialog from './components/DownloadDialog';
import PublishDialog from './components/PublishDialog/PublishDialog';
import EditorSettingsBar from './components/EditorSettingsBar';
import SettingsDialog from './components/SettingsDialog';

const useStyles = makeStyles((theme) => ({}));

// Info dialog state
type EditorPageInfoDialogState = {
  title?: string;
  message: string;
};

// Actions speed dial
type EditorPageSpeedDialActionName = 'Publish' | 'Download';
export const editorPageSpeedDialActions: SpeedDialAction<EditorPageSpeedDialActionName>[] =
  [
    { icon: <SaveAltOutlinedIcon />, name: 'Download' },
    { icon: <ShareIcon />, name: 'Publish' },
  ];

const EditorPage = () => {
  const classes = useStyles();

  // Info dialog state
  const [infoDialogState, setInfoDialogState] =
    useState<EditorPageInfoDialogState>();
  const closeInfoDialog = useCallback(() => {
    setInfoDialogState(undefined);
  }, [setInfoDialogState]);
  const isInfoDialogOpen = infoDialogState != null;

  // FAB open state
  const [openActionsFab, setOpenActionsFab] = useState(false);

  // Settings dialog
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  // Publish success dialog
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  // Download dialog
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  // Editor context
  const editorContext = useEditorContext();

  // Toast state
  const [toastState, setToastState] = useState<ToastState>();
  const onEditorShowToast = (message: string, type: 'error' | 'info') => {
    setToastState({
      message,
      type,
    });
  };

  // Images
  const showImageInfoDialog = useCallback(() => {
    setInfoDialogState({
      title: 'Unsupported File',
      message: 'We only support images up to 5mb. Please try again.',
    });
  }, [setInfoDialogState]);
  const uploadImage = async (file: File): Promise<string> => {
    if (!checkUploadSize(file.size)) {
      showImageInfoDialog();
      throw Error('File is too large');
    }
    if (!isImageMimeType(file.type)) {
      showImageInfoDialog();
      throw Error('Unsupported file type');
    }

    return getCidGatewayUrl(await editorContext.uploadImage(file));
  };

  const onImageUploadStart = () => {
    setToastState({
      type: 'info',
      message: 'Uploading your image...',
    });
  };

  const onImageUploadStop = () => {
    // TODO: Success or error
  };

  // Actions
  const onEditorSaveRequested = () => {
    setOpenActionsFab(true);
  };

  const onActionClicked = async (actionName: EditorPageSpeedDialActionName) => {
    if (actionName === 'Download') {
      // Show download dialog
      setShowDownloadDialog(true);
    } else if (actionName === 'Publish') {
      setShowPublishDialog(true);
    }
  };

  return (
    <AppPage>
      {/*Editor FAB*/}
      <SpeedDialFab
        actions={editorPageSpeedDialActions}
        open={openActionsFab}
        setIsOpen={setOpenActionsFab}
        onActionClicked={onActionClicked}
      />

      {/*Toast*/}
      <Toast state={toastState} setState={setToastState} />

      {/*Info Dialog*/}
      <InfoDialog
        isOpen={isInfoDialogOpen}
        closeDialog={closeInfoDialog}
        title={infoDialogState?.title}
        message={infoDialogState?.message}
      />

      {/*Publish Dialog*/}
      <PublishDialog
        isOpen={showPublishDialog}
        setIsOpen={setShowPublishDialog}
      />

      {/*Download Dialog*/}
      <DownloadDialog
        open={showDownloadDialog}
        setOpen={setShowDownloadDialog}
      />

      <SettingsDialog
        open={showSettingsDialog}
        setOpen={setShowSettingsDialog}
      />

      {/*Main editor*/}
      {editorContext.isInitialized && (
        <div>
          <EditorSettingsBar
            onSettingsClicked={() => setShowSettingsDialog(true)}
          />
          <MarkdownEditor
            getMarkdownRef={editorContext.getEditorValue}
            initialContent={editorContext.savedEditorState?.markdown}
            uploadImage={uploadImage}
            onImageUploadStart={onImageUploadStart}
            onImageUploadStop={onImageUploadStop}
            onSave={onEditorSaveRequested}
            onShowToast={onEditorShowToast}
          />
        </div>
      )}
    </AppPage>
  );
};

export default EditorPage;
