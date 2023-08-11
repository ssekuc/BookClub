export const BookSearch = ({ title, imageLink, author }) => {
  return (
    <div className="card">
      <img src={imageLink} alt="Book" width="100px" />
      <h1>{title}</h1>
      <h3>{author}</h3>
      <p>
        Some text about the jeans. Super slim and comfy lorem ipsum lorem
        jeansum. Lorem jeamsun denim lorem jeansum.
      </p>
      <button>Add to Cart</button>
    </div>
  );
};
