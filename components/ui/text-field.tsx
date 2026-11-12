import { useId, type InputHTMLAttributes, type ReactNode, type Ref } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  /** Rendered inside the field on the right, e.g. a Show/Hide toggle. */
  trailing?: ReactNode;
  /** Decorative icon on the left of the input. */
  icon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

export function TextField({ label, error, hint, trailing, icon, className = "", ref, ...props }: Props) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-bold">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-[0.9375rem] text-graphite">
          {hint}
        </p>
      )}
      <div
        className={
          "flex items-center rounded-field border bg-surface focus-within:outline-2 focus-within:outline-offset-2 " +
          (error
            ? "border-danger focus-within:outline-danger"
            : "border-rule focus-within:border-accent focus-within:outline-accent")
        }
      >
        {icon && <span className="pl-3.5 text-graphite">{icon}</span>}
        <input
          id={id}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          className="h-12 min-w-0 flex-1 rounded-field bg-transparent px-3 text-base placeholder:text-graphite/70 focus:outline-none focus-visible:outline-none"
          {...props}
        />
        {trailing && <div className="pr-1.5">{trailing}</div>}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-[0.9375rem] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
