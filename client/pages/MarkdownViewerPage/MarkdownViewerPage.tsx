import { makeStyles } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import getValidMarkdownFilename from '../../../util/getValidMarkdownFilename';
import AppPage from '../../components/AppPage/AppPage';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';
import SpeedDialFab, {
  SpeedDialAction,
} from '../../components/SpeedDialFab/SpeedDialFab';
import downloadMarkdownFile from '../../util/downloadMarkdownFile';
import MarkdownViewerCidEntryForm from './components/MarkdownViewerCidEntryForm';
import MarkdownViewerNoContentView from './components/MarkdownViewerNoContentView';

type Props = {
  markdown?: string;
  cid?: string; // Defined if a CID has been given
};

const useStyles = makeStyles((theme) => ({}));

// Actions speed dial
type ViewerPageSpeedDialActionName = 'Copy' | 'Download';
export const viewerPageSpeedDialActions: SpeedDialAction<ViewerPageSpeedDialActionName>[] =
  [
    { icon: <SaveAltOutlinedIcon />, name: 'Download' },
    { icon: <FileCopyOutlinedIcon />, name: 'Copy' },
  ];

const MarkdownViewerPage: React.FC<Props> = ({ markdown, cid }) => {
  const classes = useStyles();

  let content: React.ReactElement;

  if (markdown) {
    content = <MarkdownRenderer markdown={markdown} />;
  } else if (cid) {
    // Render the no info container if CID has been given but no markdown exists
    content = <MarkdownViewerNoContentView />;
  } else {
    content = <MarkdownViewerCidEntryForm />;
  }

  const [isActionsFabOpen, setIsActionsFabOpen] = useState(false);
  const onViewerActionClicked = (actionName: ViewerPageSpeedDialActionName) => {
    // Close fab
    setIsActionsFabOpen(false);

    // Handle actions
    if (actionName === 'Copy') {
      navigator.clipboard.writeText(markdown ?? '');
    } else if (actionName === 'Download') {
      // Download the markdown with a random file name
      downloadMarkdownFile({
        filename: getValidMarkdownFilename('Markdown_' + nanoid(5)),
        markdown: markdown ?? '',
      });
    }
  };
  const viewerActionsFab = !!markdown && (
    <SpeedDialFab
      actions={viewerPageSpeedDialActions}
      onActionClicked={onViewerActionClicked}
      open={isActionsFabOpen}
      setIsOpen={setIsActionsFabOpen}
    />
  );

  return (
    <AppPage>
      {/*Actions Fab*/}
      {viewerActionsFab}
      {/*Main content*/}
      {content}
    </AppPage>
  );
};

export default MarkdownViewerPage;
