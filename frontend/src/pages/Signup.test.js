import { act, fireEvent, render, screen } from "@testing-library/react";
import Signup from "./Signup";
import { registerUser } from "../apis/auth.api.js";

const mockNavigate = jest.fn();
// CRA's Jest resolver cannot read React Router 7's exports-only entry point.
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}), { virtual: true });
jest.mock("../apis/auth.api.js", () => ({ registerUser: jest.fn() }));

beforeEach(() => jest.clearAllMocks());

function submitSignup() {
  fireEvent.change(screen.getByLabelText("Full Name"), {
    target: { value: "Test User" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "test-password" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
}

test("sends registration fields, prevents duplicate clicks, and opens login on success", async () => {
  let resolveRegistration;
  registerUser.mockImplementationOnce(() => new Promise((resolve) => {
    resolveRegistration = resolve;
  }));
  render(<Signup />);
  submitSignup();

  expect(registerUser).toHaveBeenCalledWith({
    name: "Test User", email: "test@example.com", password: "test-password",
  });
  const button = screen.getByRole("button", { name: "Signing up..." });
  expect(button.disabled).toBe(true);
  fireEvent.click(button);
  expect(registerUser).toHaveBeenCalledTimes(1);
  expect(mockNavigate).not.toHaveBeenCalled();

  await act(async () => resolveRegistration({ message: "User created successfully" }));
  expect(mockNavigate).toHaveBeenCalledWith("/login");
});

test.each(["User already exists", "Server Unreachable"])(
  "shows %s and allows retrying signup", async (message) => {
    registerUser.mockRejectedValueOnce(new Error(message));
    render(<Signup />);
    submitSignup();

    expect((await screen.findByRole("alert")).textContent).toBe(message);
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Sign Up" }).disabled).toBe(false);

    registerUser.mockResolvedValueOnce({ message: "User created successfully" });
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Sign Up" })));
    expect(screen.queryByRole("alert")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  }
);
