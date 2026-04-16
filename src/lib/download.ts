/**
 * Utility to download a file.
 * In a real-world app, this would fetch from a secure CDN or Cloud Storage.
 */
export const downloadFile = (fileName: string, content: string = "This is a secure medical publication by J-Nexus Health.") => {
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName.replace(/\s+/g, '_')}_J-Nexus.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};
