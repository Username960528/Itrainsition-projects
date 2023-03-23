// src/components/Toolbar.tsx

import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

interface ToolbarProps {
  onBlock: () => void;
  onUnblock: () => void;
  onDelete: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onBlock, onUnblock, onDelete }) => {
  return (
    <ButtonGroup className="mb-3">
      <Button onClick={onBlock}>Block</Button>
      <Button onClick={onUnblock}>Unblock</Button>
      <Button onClick={onDelete}>Delete</Button>
    </ButtonGroup>
  );
};

export default Toolbar;
