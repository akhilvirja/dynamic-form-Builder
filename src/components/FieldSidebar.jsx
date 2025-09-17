import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Cross, Plus, X } from "lucide-react";

function FieldSidebar({ open, onClose, type, draft, onChangeDraft, onSave }) {
  const [local, setLocal] = useState(draft || {});

  useEffect(() => {
    setLocal(draft || {});
  }, [draft]);

  function handleChange(name, value) {
    const next = { ...local, [name]: value };
    setLocal(next);
    onChangeDraft?.(next);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose?.();
      }}
    >
      <SheetContent side="right" className="p-4">
        <SheetHeader>
          <SheetTitle>Add {type} Field</SheetTitle>
        </SheetHeader>

        {type === "text" && (
          <div className="space-y-3 mt-4">
            <div>
              <label className="text-sm">Label</label>
              <Input
                value={local.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Name</label>
              <Input
                value={local.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Placeholder</label>
              <Input
                value={local.placeholder || ""}
                onChange={(e) => handleChange("placeholder", e.target.value)}
              />
            </div>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(local.required)}
                onChange={(e) => handleChange("required", e.target.checked)}
              />
              <span>Required</span>
            </label>
          </div>
        )}

        {type === "title" && (
          <div className="space-y-3 mt-4">
            <div>
              <label className="text-sm">Text</label>
              <Input
                value={local.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
              />
            </div>
          </div>
        )}

        {(type === "dropdown" || type === "radio") && (
          <div className="space-y-3 mt-4">
            <div>
              <label className="text-sm">Label</label>
              <Input
                value={local.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Name</label>
              <Input
                value={local.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm block mb-2">Options</label>
              <div className="space-y-2">
                {(local.options || []).map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const next = [...(local.options || [])];
                        next[idx] = e.target.value;
                        handleChange("options", next);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const next = (local.options || []).filter(
                          (_, i) => i !== idx
                        );
                        handleChange("options", next);
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleChange("options", [...(local.options || []), ""])
                  }
                >
                  <Plus /> Add Option
                </Button>
              </div>
            </div>
            {type === "dropdown" && (
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(local.required)}
                  onChange={(e) => handleChange("required", e.target.checked)}
                />
                <span>Required</span>
              </label>
            )}
            <div>
              <label className="text-sm">Default</label>
              <Input
                value={local.default || ""}
                onChange={(e) => handleChange("default", e.target.value)}
              />
            </div>
          </div>
        )}

        {type === "checkbox" && (
          <div className="space-y-3 mt-4">
            <div>
              <label className="text-sm">Label</label>
              <Input
                value={local.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Name</label>
              <Input
                value={local.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(local.default)}
                onChange={(e) => handleChange("default", e.target.checked)}
              />
              <span>Default checked</span>
            </label>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={() => onSave?.(local)}>
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default FieldSidebar;
