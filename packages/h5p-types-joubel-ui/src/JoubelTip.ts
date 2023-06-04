/**
 * @param tipHtml The text to display in the popup
 * @param behaviour
 * @param behaviour.tipLabel Set to use a custom label for the tip button (you want this for good A11Y)
 * @param behaviour.helpIcon Set to 'true' to Add help-icon classname to Tip button (changes the icon)
 * @param behaviour.showSpeechBubble Set to 'false' to disable functionality (you may change this in the editor)
 * @param behaviour.tabcontrol Set to 'true' if you plan on controlling the tabindex in the parent (tabindex="-1")
 *
 * @returns The tip element or undefined if the tip is invalid, i.e. if the tip is empty
 */
export declare function JoubelTip<T extends string | null | undefined>(
  tipHtml: T,
  behaviour?: {
    tipLabel?: string;
    helpIcon?: boolean;
    showSpeechBubble?: boolean;
    tabcontrol?: boolean;
  },
): T extends "" | null | undefined ? undefined : JQuery<HTMLDivElement>;
