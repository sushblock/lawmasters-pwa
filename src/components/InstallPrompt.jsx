import { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);

  // Don’t show when already installed (standalone)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                    || window.navigator.standalone === true;

  useEffect(() => {
    if (isStandalone) return; // no prompt inside installed app

    const onBeforeInstall = (e) => {
      e.preventDefault();           // prevent default mini-infobar
      setDeferred(e);               // stash the event
      setVisible(true);             // show our UI
    };

    const onInstalled = () => setVisible(false);

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, [isStandalone]);

  if (!visible || !deferred) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg bg-white shadow-xl border p-4">
      <p className="text-sm font-medium">Install LawMasters?</p>
      <p className="mt-1 text-xs text-gray-600">
        Get a faster, fullscreen app with offline support.
      </p>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          className="px-3 py-1 text-sm border rounded"
          onClick={() => setVisible(false)}
        >
          Not now
        </button>
        <button
          className="px-3 py-1 text-sm rounded bg-blue-600 text-white"
          onClick={async () => {
            await deferred.prompt();             // show the browser prompt
            await deferred.userChoice;
            // Optional: analytics on outcome
            setDeferred(null);
            setVisible(false);
          }}
        >
          Install
        </button>
      </div>
    </div>
  );
}
