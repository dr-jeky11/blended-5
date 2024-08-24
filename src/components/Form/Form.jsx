import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiMailSend } from "react-icons/bi";
import styles from "./Form.module.css";
import { useAddCommentMutation } from "../../redux/commentApi";
import { Spinner } from "../Spinner/Spinner";

export const Form = () => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const [addComment, { isLoading }] = useAddCommentMutation();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    if (name === "author") {
      setAuthor(value);
    } else {
      setContent(value);
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!author || !content) {
      toast.error("all fields must be filled");
      return;
    }
    addComment({ author, content });
    toast.success("comment added");
    setAuthor("");
    setContent("");
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelName}>Full name</span>
          <input
            type="text"
            name="author"
            className={styles.input}
            value={author}
            onChange={onHandleChange}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Your comment</span>
          <textarea
            className={styles.input}
            name="text"
            rows="5"
            value={content}
            onChange={onHandleChange}></textarea>
        </label>

        <button disabled={isLoading} className={styles.formBtn}>
          {isLoading ? (
            <Spinner size={"sm"} />
          ) : (
            <>
              <BiMailSend className={styles.icon} />
              Send
            </>
          )}
        </button>
      </form>
    </div>
  );
};
