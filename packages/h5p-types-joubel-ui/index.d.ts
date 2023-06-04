import { JoubelHelpTextDialog } from "./src/JoubelHelpTextDialog";
import { JoubelMessageDialog } from "./src/JoubelMessageDialog";
import { JoubelProgressbar } from "./src/JoubelProgressbar";
import { JoubelProgressCircle } from "./src/JoubelProgressCircle";
import { JoubelScoreBar } from "./src/JoubelScoreBar";
import { JoubelSlider } from "./src/JoubelSlider";
import { JoubelSpeechBubble } from "./src/JoubelSpeechBubble";
import { JoubelThrobber } from "./src/JoubelThrobber";
import { JoubelTip } from "./src/JoubelTip";
import { SimpleRoundedButton } from "./src/SimpleRoundedButton";

declare module "h5p-types" {
  interface H5PObject {
    JoubelHelpTextDialog: typeof JoubelHelpTextDialog;
    JoubelMessageDialog: typeof JoubelMessageDialog;
    JoubelProgressbar: typeof JoubelProgressbar;
    JoubelProgressCircle: typeof JoubelProgressCircle;
    JoubelScoreBar: typeof JoubelScoreBar;
    JoubelSlider: typeof JoubelSlider;
    JoubelSpeechBubble: typeof JoubelSpeechBubble;
    JoubelThrobber: typeof JoubelThrobber;
    JoubelTip: typeof JoubelTip;
    SimpleRoundedButton: typeof SimpleRoundedButton;

    JoubelUI: {
      createButton: <T extends {}>(
        params: T & { class?: string; href?: string; },
      ) => T extends { href: string }
        ? T extends { href: "" }
          ? JQuery<HTMLButtonElement>
          : JQuery<HTMLAnchorElement>
        : JQuery<HTMLButtonElement>;

      /**
       * Alias of `new H5P.JoubelHelpTextDialog(...)`
       *
       * @param header HTML for the header
       * @param message HTML for the body
       * @param closeButtonTitle The title for the close button
       */
      createHelpTextDialog: (
        header: string,
        message: string,
        closeButtonTitle: string,
      ) => JoubelHelpTextDialog;

      /**
       * Alias of `new H5P.JoubelMessageDialog(...)`
       *
       * @param $container The container which message dialog will be appended to
       * @param message The message
       */
      createMessageDialog: (
        $container: JQuery<HTMLElement>,
        message: string,
      ) => JoubelMessageDialog;

      /**
       * Alias of `new H5P.JoubelProgressbar(...)`
       *
       * @param totalNumberOfSteps
       * @param options
       * @param options.disableAria Disable readspeaker assistance
       * @param options.progressText
       *          A progress text for describing current progress out of total progress for readspeakers.
       *          Special options `:num` and `:total` will be replaced with current and total progress.
       *          Default: "Slide :num of :total"
       */
      createProgressbar: (
        totalNumberOfSteps: number,
        options?: {
          disableAria?: boolean;
          progressText?: string;
        },
      ) => JoubelProgressbar;

      /**
       * Alias of `new H5P.JoubelProgressCircle(...)`
       *
       * @param progress The progress (0 to 100)
       * @param progressColor The color of the progress bar as a hex value
       * @param fillColor The color of the fill as a hex value
       * @param backgroundColor The color of the background as a hex value
       */
      createProgressCircle: (
        progress: number,
        progressColor: string,
        fillColor: string,
        backgroundColor: string,
      ) => JoubelProgressCircle;

      /**
       * Alias of `new H5P.JoubelScoreBar(...)`
       *
       * @param maxScore Maximum score
       * @param label Makes it easier for readspeakers to identify the scorebar
       * @param helpText Score explanation
       * @param scoreExplanationButtonLabel Label for score explanation button
       */
      createScoreBar: (
        maxScore: number,
        label?: string,
        helpText?: string,
        buttonLabel?: string,
      ) => JoubelScoreBar;

      /**
       * Alias of `new H5P.SimpleRoundedButton(...)`
       *
       * @param buttonInnerHtml Will be placed inside a span within the button
       */
      createSimpleRoundedButton: (
        buttonInnerHtml: string,
      ) => ReturnType<typeof SimpleRoundedButton>;

      /**
       * Alias of `new H5P.JoubelSlider(...)`
       *
       * @param params
       */
      createSlider: (params?: {}) => JoubelSlider;

      /**
       * Alias of `new H5P.JoubelThrobber(...)`
       *
       * Create loading throbber
       */
      createThrobber: () => JoubelThrobber;

      /**
       * Alias of `new H5P.JoubelTip(...)`
       *
       * @param tipHtml The text to display in the popup
       * @param behaviour
       * @param behaviour.tipLabel Set to use a custom label for the tip button (you want this for good A11Y)
       * @param behaviour.helpIcon Set to 'true' to Add help-icon classname to Tip button (changes the icon)
       * @param behaviour.showSpeechBubble Set to 'false' to disable functionality (you may change this in the editor)
       * @param behaviour.tabcontrol Set to 'true' if you plan on controlling the tabindex in the parent (tabindex="-1")
       *
       * @returns The tip element or undefined if the tip is invalid, i.e. if the tip is empty
       */
      createTip: (
        tipHtml: string,
        params: {
          tipLabel?: string;
          helpIcon?: boolean;
          showSpeechBubble?: boolean;
          tabcontrol?: boolean;
        },
      ) => ReturnType<typeof JoubelTip>;
    };
  }
}
