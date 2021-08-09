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
import MarkdownFileData from '../../../types/MarkdownFileData';
import { getCidGatewayUrl } from '../../../util/cidUtils';
import {
  checkUploadSize,
  isImageMimeType,
} from '../../../util/fileUploadUtils';
import getValidMarkdownFilename from '../../../util/getValidMarkdownFilename';
import BackdropLoadingScreen from '../../components/BackdropLoadingScreen/BackdropLoadingScreen';

import TextEditor from '../../components/TextEditor/TextEditor';
import Toast, { ToastState } from '../../components/Toast/Toast';
import callPublishApi from '../../util/api/callPublishApi';
import callUploadApi from '../../util/api/callUploadApi';
import downloadMarkdownFile from '../../util/downloadMarkdownFile';
import { ActionName } from './EditorPageActions';
import EditorPageActionsFab from './EditorPageActionsFab';
import EditorPageTopBar from './EditorPageTopBar';
import PublishSuccessDialog from './PublishSuccessDialog/PublishSuccessDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));

type EditorPageInfoDialogState = {
  title?: string;
  message: string;
};

// TODO: Keep track of uploaded CID's and delete if able
const EditorPage = () => {
  const classes = useStyles();

  // Info dialog state
  const [infoDialogState, setInfoDialogState] =
    useState<EditorPageInfoDialogState>();
  const closeInfoDialog = useCallback(() => {
    setInfoDialogState(undefined);
  }, [setInfoDialogState]);

  // FAB open state
  const [openActionsFab, setOpenActionsFab] = useState(false);

  // Loading state
  const [showFullScreenLoading, setShowFullScreenLoading] = useState(false);

  // Publish success dialog
  const [publishedCid, setPublishedCid] = useState('');
  const showPublishSuccessDialog = !!publishedCid;
  const closePublishSuccessDialog = () => setPublishedCid('');

  // Editor state (TODO - lift out into a hook to have autosave!)
  const [filename, setFileName] = useState('Untitled');
  const getMarkdownRef = useRef<() => string>(() => '');

  const getMarkdownFile = (): MarkdownFileData => {
    const markdown = getMarkdownRef.current();
    const processedFilename = getValidMarkdownFilename(filename);

    return {
      filename: processedFilename,
      markdown,
    };
  };

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

    const uploadedCid = (await callUploadApi(file)).data?.cid;

    if (uploadedCid) {
      return getCidGatewayUrl(uploadedCid);
    } else {
      throw Error('No CID in upload API response');
    }
  };

  const onImageUploadStart = () => {
    setToastState({
      type: 'info',
      message: 'Uploading your image...',
    });
  };

  const onImageUploadStop = () => {};

  // Actions
  const onEditorSaveRequested = () => {
    setOpenActionsFab(true);
  };

  const onActionClicked = async (actionName: ActionName) => {
    const markdownFileData = getMarkdownFile();

    if (actionName === 'Download') {
      downloadMarkdownFile(markdownFileData);
    } else if (actionName === 'Publish') {
      // Start loading
      setShowFullScreenLoading(true);

      const publishResult = await callPublishApi(markdownFileData);

      setShowFullScreenLoading(false);

      if (publishResult?.data?.cid) {
        console.log('Published successfully', publishResult);
        setPublishedCid(publishResult.data.cid);
      } else {
        setToastState({
          type: 'error',
          message: 'Something went wrong during publishing. Please try again.',
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      {/*Loading / dialogs*/}
      <BackdropLoadingScreen isOpen={showFullScreenLoading} />
      <PublishSuccessDialog
        cid={publishedCid}
        isOpen={showPublishSuccessDialog}
        closeDialog={closePublishSuccessDialog}
      />

      {/*Editor peripherals*/}
      <EditorPageTopBar fileName={filename} onFileNameChanged={setFileName} />
      <EditorPageActionsFab
        open={openActionsFab}
        setIsOpen={setOpenActionsFab}
        onActionClicked={onActionClicked}
      />
      <Toast state={toastState} setState={setToastState} />
      <Dialog open={infoDialogState != null} onClose={closeInfoDialog}>
        <DialogTitle>{infoDialogState?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{infoDialogState?.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeInfoDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/*Main editor*/}
      <TextEditor
        getMarkdownRef={getMarkdownRef}
        uploadImage={uploadImage}
        onImageUploadStart={onImageUploadStart}
        onImageUploadStop={onImageUploadStop}
        onSave={onEditorSaveRequested}
        onShowToast={onEditorShowToast}
      />
    </div>
  );
};

export default EditorPage;
