const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const highlightLegalText = (text: string, query: string, markClass: string) => {
  if (!query) return [text];
  const pattern = escapeRegExp(query);
  const splitter = new RegExp(`(${pattern})`, "gi");
  const matcher = new RegExp(`^${pattern}$`, "i");
  return text.split(splitter).map((part, index) => (
    matcher.test(part) ? <mark key={index} class={markClass}>{part}</mark> : part
  ));
};

export const renderLegalContent = (content: string, query: string, classPrefix: string) => {
  return content.split("\n\n").map((paragraph, paragraphIndex) => {
    const lines = paragraph.split("\n").map((line, lineIndex) => {
      if (line.startsWith("- ")) {
        return (
          <li key={lineIndex} class={`${classPrefix}__list-item`}>
            {highlightLegalText(line.substring(2), query, `${classPrefix}__mark`)}
          </li>
        );
      }
      if (line.startsWith("**") && line.includes(":**")) {
        const colonIndex = line.indexOf(":**");
        const label = line.substring(2, colonIndex);
        const rest = line.substring(colonIndex + 3);
        return (
          <p key={lineIndex} class={`${classPrefix}__para`}>
            <strong>{highlightLegalText(label, query, `${classPrefix}__mark`)}:</strong>{highlightLegalText(rest, query, `${classPrefix}__mark`)}
          </p>
        );
      }
      if (line.startsWith("**")) {
        const boldEnd = line.indexOf("**", 2);
        if (boldEnd > 2) {
          const label = line.substring(2, boldEnd);
          const rest = line.substring(boldEnd + 2);
          return (
            <p key={lineIndex} class={`${classPrefix}__para`}>
              <strong>{highlightLegalText(label, query, `${classPrefix}__mark`)}</strong>{highlightLegalText(rest, query, `${classPrefix}__mark`)}
            </p>
          );
        }
      }
      return <p key={lineIndex} class={`${classPrefix}__para`}>{highlightLegalText(line, query, `${classPrefix}__mark`)}</p>;
    });
    if (paragraph.split("\n").some((line) => line.startsWith("- "))) {
      return <ul key={paragraphIndex} class={`${classPrefix}__list`}>{lines}</ul>;
    }
    return <div key={paragraphIndex}>{lines}</div>;
  });
};
