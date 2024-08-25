// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard

/**
 * Interface CopyToClipboard params
 */
interface ICopyToClipboard {
  /** HTML reference identifier ```<div id="foo"></div>```  */
  /** String value */
  value: string;
  /** (Optional) message to display in snackbar on success */
  message: string;
}

export const copyToClipboard = async ({ message, value }: ICopyToClipboard) => {
  try {
    let copyValue = "";

    if (!navigator.clipboard) {
      throw new Error("Browser don't have support for native clipboard.");
    }

    copyValue = value;

    await navigator.clipboard.writeText(copyValue);
    console.log(message ?? "Copied!!!");
  } catch (error) {
    throw error;
  }
};
