type Commit = {
  sha: string;
  commit: {
    author: {
      name: string;
    };
    message: string;
  };
};

export const filterCommitsData = (data: Commit[]) => data.map(record => {
  const { sha, commit: { author: { name: author }, message } } = record;
  return { sha, author, message };
});
