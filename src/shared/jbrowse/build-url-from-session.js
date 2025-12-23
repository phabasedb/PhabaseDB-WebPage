/**
 * Builds a JBrowse URL using a predefined session (sessionDefault).
 * Intended for the standalone JBrowse page.
 */
export function buildJBrowseUrlFromSession({
  sessionDefault,
  baseUrl = process.env.NEXT_PUBLIC_URI_JBROWSE,
  configFile = "config.json",
}) {
  if (!baseUrl) {
    return { url: null, message: "JBrowse base URL is not configured." };
  }

  if (!sessionDefault) {
    return { url: null, message: "Session definition is missing." };
  }

  let encodedSession;
  try {
    encodedSession = encodeURIComponent(JSON.stringify(sessionDefault));
  } catch {
    return { url: null, message: "Invalid session definition." };
  }

  return {
    url: `${baseUrl}?config=${configFile}&session=spec-${encodedSession}`,
    message: null,
  };
}
