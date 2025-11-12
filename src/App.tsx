import { useState, useEffect, useRef } from 'react';
import { ConversationDialog } from './components/ConversationDialog';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <ConversationDialog />
    </div>
  );
}
