import React, { useCallback, useRef, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { getCidGatewayUrl } from '../../../util/cidUtils';
import {
  checkUploadSize,
  isImageMimeType,
} from '../../../util/fileUploadUtils';
import AppPage from '../../components/AppPage/AppPage';
import BackdropLoadingScreen from '../../components/BackdropLoadingScreen/BackdropLoadingScreen';
import InfoDialog from '../../components/InfoDialog/InfoDialog';

import MarkdownEditor from '../../components/MarkdownEditor/MarkdownEditor';
import Toast, { ToastState } from '../../components/Toast/Toast';
import { useEditorContext } from '../../context/EditorContext';
import { ActionName } from './components/EditorPageActions';
import EditorPageActionsFab from './components/EditorPageActionsFab';
import EditorPageDownloadDialog from './components/EditorPageDownloadDialog';
import PublishSuccessDialog from './components/PublishSuccessDialog';

const useStyles = makeStyles((theme) => ({}));

type EditorPageInfoDialogState = {
  title?: string;
  message: string;
};

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

  // Loading state
  const [showFullScreenLoading, setShowFullScreenLoading] = useState(false);

  // Publish success dialog
  const [publishedCid, setPublishedCid] = useState('');
  const showPublishSuccessDialog = !!publishedCid;
  const closePublishSuccessDialog = () => setPublishedCid('');

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

  const onActionClicked = async (actionName: ActionName) => {
    if (actionName === 'Download') {
      // Show download dialog
      setShowDownloadDialog(true);
    } else if (actionName === 'Publish') {
      // Start loading
      setShowFullScreenLoading(true);

      try {
        const publishedCid = await editorContext.publishMarkdown();
        console.log('Published successfully', publishedCid);
        setPublishedCid(publishedCid);
      } catch (err) {
        setToastState({
          type: 'error',
          message: 'Something went wrong during publishing. Please try again.',
        });
      }

      setShowFullScreenLoading(false);
    }
  };

  return (
    <AppPage>
      {/*Loading / dialogs*/}
      <BackdropLoadingScreen isOpen={showFullScreenLoading} />
      <PublishSuccessDialog
        cid={publishedCid}
        isOpen={showPublishSuccessDialog}
        closeDialog={closePublishSuccessDialog}
      />

      {/*Editor FAB*/}
      <EditorPageActionsFab
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

      {/*Download Dialog*/}
      <EditorPageDownloadDialog
        open={showDownloadDialog}
        setOpen={setShowDownloadDialog}
      />

      {/*Main editor*/}
      {editorContext.isInitialized && (
        <MarkdownEditor
          getMarkdownRef={editorContext.getEditorValue}
          initialContent={editorContext.savedEditorState?.markdown}
          uploadImage={uploadImage}
          onImageUploadStart={onImageUploadStart}
          onImageUploadStop={onImageUploadStop}
          onSave={onEditorSaveRequested}
          onShowToast={onEditorShowToast}
        />
      )}
    </AppPage>
  );
};

export default EditorPage;
