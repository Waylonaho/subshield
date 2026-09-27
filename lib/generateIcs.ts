export function generateIcsFile(
  projectName: string,
  preliminaryDeadline: string | null,
  lienDeadline: string
): string {
  const formatDate = (dateStr: string) => dateStr.replace(/-/g, '');

  let events = '';

  if (preliminaryDeadline) {
    const pDate = formatDate(preliminaryDeadline);
    events += `
BEGIN:VEVENT
UID:prelim-${Date.now()}@subshield.com
DTSTAMP:${formatDate(new Date().toISOString().slice(0, 10))}T090000Z
DTSTART;VALUE=DATE:${pDate}
SUMMARY:CRITICAL: Preliminary Notice Deadline - ${projectName}
DESCRIPTION:Statutory cutoff window to deliver preliminary notice or notice to owner. Missing this deadline forfeits mechanic's lien rights.
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Preliminary Notice Deadline in 5 Days!
TRIGGER:-P5D
END:VALARM
END:VEVENT`;
  }

  const lDate = formatDate(lienDeadline);
  events += `
BEGIN:VEVENT
UID:lien-${Date.now()}@subshield.com
DTSTAMP:${formatDate(new Date().toISOString().slice(0, 10))}T090000Z
DTSTART;VALUE=DATE:${lDate}
SUMMARY:FINAL CUTOFF: Mechanics Lien Filing Deadline - ${projectName}
DESCRIPTION:Last statutory date to record a formal mechanic's lien against the real property parcel.
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Lien Filing Cutoff in 14 Days!
TRIGGER:-P14D
END:VALARM
END:VEVENT`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SubShield HQ//Lien Safe Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH${events}
END:VCALENDAR`.trim();
}