import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller } from "react-hook-form";

const RichTextEditor = ({ name, label, control, rules, ...editorProps }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <div
            className={`border rounded-md bg-gray-100   focus:ring ${
              error
                ? "border-red-500 focus:border-red-500"
                : "focus:border-blue-300"
            }`}
          >
            <SimpleMDE
              {...field}
              {...editorProps}
              className={`bg-white ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring`}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default RichTextEditor;
