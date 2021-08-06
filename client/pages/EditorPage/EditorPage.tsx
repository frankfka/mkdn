import React, { useRef, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { saveAs } from 'file-saver';
import MarkdownFileData from '../../../types/MarkdownFileData';
import getValidMarkdownFilename from '../../../util/getValidMarkdownFilename';
import BackdropLoadingScreen from '../../components/BackdropLoadingScreen/BackdropLoadingScreen';

import TextEditor from '../../components/TextEditor/TextEditor';
import callPublishApi from '../../util/api/callPublishApi';
import createPostFetchInit from '../../util/createPostFetchInit';
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

const EditorPage = () => {
  const classes = useStyles();

  // FAB open state
  const [openActionsFab, setOpenActionsFab] = useState(false);

  // Loading state
  const [showFullScreenLoading, setShowFullScreenLoading] = useState(false);

  // Publish success dialog
  const [publishedCid, setPublishedCid] = useState('');
  const showPublishSuccessDialog = !!publishedCid;
  const closePublishSuccessDialog = () => setPublishedCid('');

  // Editor state
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
        // TODO show error toast
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

      {/*Main editor*/}
      <TextEditor getMarkdownRef={getMarkdownRef} />
    </div>
  );
};

export default EditorPage;
