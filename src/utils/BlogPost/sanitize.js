import DOMPurify from "dompurify";

export const sanitize = (content) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "strong",
      "em",
      "u",
      "ol",
      "ul",
      "li",
      "a",
      "img",
      "blockquote",
      "code",
      "pre",
      "div",
      "span",
    ],
    ALLOWED_ATTR: ["href", "target", "src", "alt", "class", "style"],
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|xxx):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_TAGS: ["iframe"], // Add this only if you want to allow embedded content
    ADD_ATTR: ["frameborder", "allowfullscreen"], // Attributes for iframes if needed
  });
  return sanitizedContent;
};

export const sanitizeTitle = (content) => {
  const sanitizedTitle = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
  return sanitizedTitle;
};
