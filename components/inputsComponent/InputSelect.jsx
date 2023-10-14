"use client";

import { Card } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const InputSelect = ({
  type,
  name,
  label,
  options,
  placeholder,
  prefix,
  errors,
  control,
  row,
  rules,
  min,
  value,
  className,
  ...inputProps
}) => {
  const InputElement = type === "select" ? "select" : "input";
  console.log({ errors });
  return (
    <>
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {type === "text" && (
          <div className={`flex ${prefix && "items-center"}`}>
            {prefix && (
              <div className="flex items-center mr-2">
                <InputElement
                  name={`${name}-prefix`}
                  type="text"
                  {...inputProps}
                  className={`w-12 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                    error ? "border-red-500" : "focus:border-blue-300"
                  }`}
                  placeholder="Prefix"
                />
              </div>
            )}
            <InputElement
              name={name}
              {...inputProps}
              className={`flex-grow p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                error ? "border-red-500" : "focus:border-blue-300"
              }`}
              placeholder={placeholder}
            />
          </div>
        )}
        {type === "select" && (
          <InputElement
            name={name}
            {...inputProps}
            className={`w-full p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
              error ? "border-red-500" : "focus:border-blue-300"
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </InputElement>
        )}
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div> */}

      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {type === "text" && (
          <div className={`flex ${prefix && "items-center"}`}>
            {prefix && (
              <div className="flex items-center mr-2">
                <InputElement
                  name={`${name}-prefix`}
                  type="text"
                  {...inputProps}
                  className={`w-12 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                    error ? "border-red-500" : "focus:border-blue-300"
                  }`}
                  placeholder="Prefix"
                />
              </div>
            )}
            <InputElement
              name={name}
              {...inputProps}
              className={`flex-grow p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                error ? "border-red-500" : "focus:border-blue-300"
              }`}
              placeholder={placeholder}
            />
          </div>
        )}
        {type === "select" && (
          <InputElement
            name={name}
            {...inputProps}
            className={`w-32 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
              error ? "border-red-500" : "focus:border-blue-300"
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </InputElement>
        )}
        {type === "textarea" && (
          <textarea
            style={{ resize: "none" }}
            name={name}
            rows={10}
            {...inputProps}
            className={`w-full p-2 border  rounded-md bg-gray-100 focus:outline-none focus:ring ${
              error ? "border-red-500" : "focus:border-blue-300"
            }`}
            placeholder={placeholder}
          />
        )}
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div> */}

      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {type === "text" && (
          <div className={`flex ${prefix && "items-center"}`}>
            
            {prefix && (
              <div className="flex items-center mr-2">
                <InputElement
                  name={`${name}-prefix`}
                  type="text"
                  {...inputProps}
                  className={`w-12 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                    errors && "border-red-500 focus:border-red-500"
                  }`}
                  placeholder="Prefix"
                />
              </div>
            )}
            <InputElement
              name={name}
              {...inputProps}
              className={`flex-grow p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                errors && "border-red-500 focus:border-red-500"
              }`}
              placeholder={placeholder}
            />
          </div>

          
        )}
        {type === "select" && (
          <InputElement
            name={name}
            {...inputProps}
            className={`w-full p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
              errors && "border-red-500 focus:border-red-500"
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </InputElement>
        )}
        {type === "textarea" && (
          <textarea
            style={{ resize: "none" }}
            name={name}
            rows={10}
            {...inputProps}
            className={`w-full p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
              errors && "border-red-500 focus:border-red-500"
            }`}
            placeholder={placeholder}
          />
        )}
        {errors && <p className="mt-2 text-sm text-red-500">{errors}</p>}
      </div> */}

      <div className={` ${className ? className : "mb-4"}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <div className="">
              {type === "text" && (
                <div className={`flex  ${prefix && "items-center"}`}>
                  {prefix && (
                    <div className="flex items-center mr-2">
                      <input
                        name={`${name}-prefix`}
                        type="text"
                        {...inputProps}
                        {...field}
                        className={`w-12 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                          errors && "border-red-500 focus:border-red-500"
                        }`}
                        placeholder="234"
                      />
                    </div>
                  )}

                  <input
                    name={name}
                    value={value}
                    type="text"
                    {...inputProps}
                    {...field}
                    className={`flex-grow p-2  w-full border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                      errors && "border-red-500 focus:border-red-500"
                    }`}
                    placeholder={placeholder}
                  />
                </div>
              )}
              {type === "select" && (
                <select
                  name={name}
                  {...inputProps}
                  {...field}
                  className={`w-full p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                    errors && "border-red-500 focus:border-red-500"
                  }`}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              {type === "textarea" && (
                <textarea
                  style={{ resize: "none" }}
                  name={name}
                  rows={row}
                  {...inputProps}
                  {...field}
                  className={`w-full  p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                    errors && "border-red-500 focus:border-red-500"
                  }`}
                  placeholder={placeholder}
                />
              )}{" "}
              {type === "time" && (
                <input
                  type="time"
                  name={name}
                  {...inputProps}
                  {...field}
                  className={`w-full  p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                    errors && "border-red-500 focus:border-red-500"
                  }`}
                  placeholder={placeholder}
                />
              )}{" "}
              {type === "date" && (
                <input
                  type="date"
                  name={name}
                  {...inputProps}
                  {...field}
                  className={`w-full  p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                    errors && "border-red-500 focus:border-red-500"
                  }`}
                  placeholder={placeholder}
                />
              )}{" "}
              {type === "number" && (
                <input
                  type="number"
                  name={name}
                  min={min}
                  {...inputProps}
                  {...field}
                  className={`w-full  p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring ${
                    errors && "border-red-500 focus:border-red-500"
                  }`}
                  placeholder={placeholder}
                />
              )}
            </div>
          )}
        />
        {errors && (
          <p className="mt-2 text-sm text-red-500">{errors.message}</p>
        )}
      </div>
    </>
  );
};

export default InputSelect;
