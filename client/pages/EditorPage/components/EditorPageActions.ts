import React from 'react';

export type ActionName = 'Publish' | 'Download';

export type ActionConfig = {
  icon: React.ReactNode;
  name: ActionName;
};
