import { wait } from './wait';

describe('wait', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('resolves with the callback return value after the given delay', async () => {
    const promise = wait(() => 'done', 1000);
    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toBe('done');
  });

  it('does not resolve before the delay elapses', async () => {
    let called = false;
    const promise = wait(() => { called = true; return true; }, 1000);

    jest.advanceTimersByTime(999);
    expect(called).toBe(false);

    jest.advanceTimersByTime(1);
    await promise;
    expect(called).toBe(true);
  });

  it('works with a zero delay', async () => {
    const promise = wait(() => 42, 0);
    jest.advanceTimersByTime(0);
    await expect(promise).resolves.toBe(42);
  });
});
