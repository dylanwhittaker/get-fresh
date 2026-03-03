import { act, renderHook } from "@testing-library/react-native";
import { useDebounce } from "../use-debounce";

describe("useDebounce", () => {
	beforeEach(() => {
		jest.clearAllTimers();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("returns initial and updates after delay", () => {
		const { result } = renderHook(
			(props: { value: string; delay: number }) =>
				useDebounce(props.value, props.delay),
			{ initialProps: { value: "hello", delay: 500 } }
		);

		expect(result.current).toBe("hello");

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(result.current).toBe("hello");
	});

	it("debounces value and does not update immediately", () => {
		const { result, rerender } = renderHook(
			(props: { value: string; delay: number }) =>
				useDebounce(props.value, props.delay),
			{ initialProps: { value: "initial", delay: 500 } }
		);

		expect(result.current).toBe("initial");

		rerender({ value: "updated", delay: 500 });
		expect(result.current).toBe("initial");

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(result.current).toBe("updated");
	});
});
