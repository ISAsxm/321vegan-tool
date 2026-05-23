import styled from "styled-components";

const TextContent = styled.span`
  flex: 1;
  min-width: 0;
  line-height: inherit;
`;

const Highlight = styled.mark`
  border-radius: var(--border-radius-tiny);
  background-color: ${(props) =>
    props.$variant === "non-vegan"
      ? "var(--color-red-100)"
      : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.$variant === "non-vegan"
      ? "var(--color-red-800)"
      : "var(--color-yellow-800)"};
`;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildHighlightRegex(searchWords) {
  const escapedWords = searchWords
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);

  return new RegExp(`(${escapedWords.join("|")})`, "gi");
}

function TextHighlighter({ text, nonVeganWords, maybeVeganWords }) {
  const nonVeganWordsSet = new Set(
    nonVeganWords.map((word) => word.toLowerCase()),
  );
  const maybeVeganWordsSet = new Set(
    maybeVeganWords.map((word) => word.toLowerCase()),
  );
  const highlightRegex = buildHighlightRegex([
    ...nonVeganWords,
    ...maybeVeganWords,
  ]);

  return (
    <TextContent>
      {text.split(highlightRegex).map((part, index) => {
        const normalizedPart = part.toLowerCase();

        if (nonVeganWordsSet.has(normalizedPart)) {
          return (
            <Highlight key={`${part}-${index}`} $variant="non-vegan">
              {part}
            </Highlight>
          );
        }

        if (maybeVeganWordsSet.has(normalizedPart)) {
          return (
            <Highlight key={`${part}-${index}`} $variant="maybe-vegan">
              {part}
            </Highlight>
          );
        }

        return part;
      })}
    </TextContent>
  );
}

export default TextHighlighter;
