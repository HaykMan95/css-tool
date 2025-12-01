import { useState, useRef, useEffect } from "react";

interface TextAreaProps {
  name: string;
  maxLines?: number;
}

export function TextArea({ name, maxLines = 50 }: TextAreaProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    if (value) {
      const lines = value.split("\n");
      setLineCount(lines.length);
    } else {
      setLineCount(1);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const lines = newValue.split("\n");

    // Enforce hard limit of 50 lines
    if (lines.length > maxLines) {
      const truncated = lines.slice(0, maxLines).join("\n");
      setValue(truncated);
      setLineCount(maxLines);
    } else {
      setValue(newValue);
      setLineCount(lines.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const lines = value.split("\n");
    
    // Prevent Enter key if at max lines
    if (e.key === "Enter" && lines.length >= maxLines) {
      e.preventDefault();
      return;
    }

    // Prevent paste if it would exceed max lines
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      setTimeout(() => {
        const newValue = textareaRef.current?.value || "";
        const newLines = newValue.split("\n");
        if (newLines.length > maxLines) {
          const truncated = newLines.slice(0, maxLines).join("\n");
          setValue(truncated);
          setLineCount(maxLines);
          if (textareaRef.current) {
            textareaRef.current.value = truncated;
          }
        }
      }, 0);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="css-input" className="text-sm font-medium text-gray-700">
          CSS Input
        </label>
        <span className="text-sm text-gray-500">
          {lineCount} / {maxLines} lines
        </span>
      </div>
      <textarea
        name={name}
        id="css-input"
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={(e) => {
          const pastedText = e.clipboardData.getData("text");
          const currentLines = value.split("\n");
          const pastedLines = pastedText.split("\n");
          const totalLines = currentLines.length + pastedLines.length - 1;
          
          if (totalLines > maxLines) {
            e.preventDefault();
            const remainingLines = maxLines - currentLines.length;
            if (remainingLines > 0) {
              const truncatedPaste = pastedLines.slice(0, remainingLines).join("\n");
              setValue(value + truncatedPaste);
            }
          }
        }}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Enter your CSS here...&#10;&#10;Example:&#10;.btn {&#10;  color: white;&#10;  background-color: blue;&#10;  padding: 12px 16px;&#10;  border-radius: 4px;&#10;}"
      />
    </div>
  );
}

