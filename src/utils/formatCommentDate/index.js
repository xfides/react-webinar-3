export default function formatCommentDate(dateString, lang = 'ru') {
  const date = new Date(dateString);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  switch (lang) {
    case 'ru':
      const formatter = new Intl.DateTimeFormat('ru-RU', options);
      const formattedDate = formatter.format(date);
      const [datePart, timePart] = formattedDate.split(', ');

      return `${datePart.slice(0, -2)} в ${timePart}`;
    case 'en': {
      const formatter = new Intl.DateTimeFormat('en-GB', options);

      return formatter.format(date);
    }
  }
}
