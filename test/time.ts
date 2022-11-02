function sleep(timeout: number = 50): Promise<void> {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, timeout);
  });
}

export { sleep };
