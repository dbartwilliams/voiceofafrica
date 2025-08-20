import React, { useState } from "react";

const CommentForm = ({
  btnLabel,
  formSubmitHanlder,
  formCancelHandler = null,
  initialText = "",
  loading = false,
}) => {
  const [value, setValue] = useState(initialText);

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHanlder(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end p-4 border border-gray-700 rounded">
        <textarea
          className="w-full bg-transparent resize-none focus:outline-0"
          rows="5"
          placeholder="Leave your comment here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className="px-6 py-2.5 rounded-lg bg-gray-700 text-white cursor-pointer"
            >
              Cancel
            </button>
           )} 
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 rounded bg-[#5eeccc] hover:bg-[#1be415] tracking-[.1em] cursor-pointer
         text-black font-bold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Send
            {/* {btnLabel} */}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;