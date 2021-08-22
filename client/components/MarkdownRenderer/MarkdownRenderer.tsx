import { Link as MaterialLink, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Link from 'next/link';
import React, { useState } from 'react';
import Editor from 'rich-markdown-editor';
import { isMarkdownEncrypted } from '../../util/markdownEncryption';

type Props = {
  markdown: string;
};

const useStyles = makeStyles((theme) => ({
  encryptedAlert: {
    marginBottom: theme.spacing(2),
  },
  encryptedAlertIcon: {
    alignItems: 'center',
  },
}));

const MarkdownRenderer: React.FC<Props> = ({ markdown }) => {
  const classes = useStyles();

  const [showEncryptedAlert, setShowEncryptedAlert] = useState(
    isMarkdownEncrypted(markdown)
  );
  // Display an alert if the markdown is encrypted
  const encryptedAlert = showEncryptedAlert && (
    <Alert
      severity="warning"
      onClose={() => setShowEncryptedAlert(false)}
      className={classes.encryptedAlert}
      classes={{
        icon: classes.encryptedAlertIcon,
      }}
    >
      It looks like this Markdown is encrypted. To view its content, enter the
      password on the{' '}
      <Link href="/viewer" passHref>
        <MaterialLink underline="always">Viewer Home Page</MaterialLink>
      </Link>
      .
    </Alert>
  );

  return (
    <div>
      {encryptedAlert}
      <Editor
        disableExtensions={['container_notice']}
        defaultValue={markdown}
        readOnly
      />
    </div>
  );
};

export default MarkdownRenderer;
