import app from "./app";

const PORT: Number = 8000;

app.listen(PORT, () => {
  console.log(`Server connected at port ${PORT}`);
});
