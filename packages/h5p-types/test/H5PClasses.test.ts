/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import type {
  EventDispatcher,
  H5PActionBar,
  H5PContentUpgradeProcess,
  H5POfflineRequestQueue,
  H5PRequestQueue,
  H5PVersion,
} from "..";

// @ts-expect-error Test
namespace Test_H5PActionBar_EventDispatcher {
  declare const actionBar: H5PActionBar;

  // Extends EventDispatcher, so it has on/off/trigger
  actionBar.on("reuse", () => {});
  actionBar.trigger("copyrights");

  const hasActions: boolean = actionBar.hasActions();
  const domElement: JQuery<HTMLUListElement> = actionBar.getDOMElement();

  void hasActions;
  void domElement;
}

// @ts-expect-error Test
namespace Test_H5PActionBar_IsAssignableToEventDispatcher {
  declare const actionBar: H5PActionBar;

  const dispatcher: EventDispatcher = actionBar;

  void dispatcher;
}

// @ts-expect-error Test
namespace Test_H5PRequestQueue {
  declare const queue: H5PRequestQueue;

  queue.add("https://example.com", { score: 1 });
  queue.getStoredRequests();
  queue.clearQueue();
  queue.resumeQueue();
  queue.processQueue([]);
  queue.displayToastMessage("msg");

  const processingQueue: boolean = queue.processingQueue;

  void processingQueue;
}

// @ts-expect-error Test
namespace Test_H5POfflineRequestQueue {
  declare const queue: H5POfflineRequestQueue;

  queue.add("https://example.com", { score: 1 });
}

// @ts-expect-error Test
namespace Test_H5PContentUpgradeProcess {
  declare const ContentUpgradeProcess: typeof H5PContentUpgradeProcess;
  declare const Version: typeof H5PVersion;

  const process = new ContentUpgradeProcess(
    "H5P.Foo 1.0",
    new Version("1.0"),
    new Version("2.0"),
    "{}",
    42,
    (_name, _version, next) => next(),
    (_error) => {},
  );

  void process;
}
