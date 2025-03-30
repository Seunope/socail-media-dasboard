import { Input, InputProps } from "./input";
import { Label, LabelProps } from "./label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  labelProps?: LabelProps;
  inputProps: InputProps;
  className?: string;
  description?: string;
}

export function FormField({
  labelProps,
  inputProps,
  className,
  description,
}: FormFieldProps) {
  return (
    <div className={cn("grid w-full items-center gap-1.5", className)}>
      {labelProps && <Label {...labelProps}>{labelProps.children}</Label>}
      <Input {...inputProps} />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
