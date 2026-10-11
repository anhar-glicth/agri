"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, RotateCw, Save, Upload } from "lucide-react";
import { tambahLahan } from "@/services/tambah";

const formSchema = z.object({
  nama: z.string().min(3, "Nama lahan minimal 3 karakter."),
  luas: z.coerce.number(),
  lokasi: z.string().min(3, "Lokasi wajib diisi."),
  tanaman: z.string().min(1, "Silakan pilih jenis Tanaman."),
  sensor: z.string().min(1, "ID sensor wajib diisi."),
  gambar: z.instanceof(File).nullable(),
});

const tanaman = [
  { label: "Jagung", value: "Jagung" },
  { label: "Gandum", value: "Gandum" },
  { label: "Kentang", value: "Kentang" },
  { label: "Beras", value: "Beras" },
  { label: "Tebu", value: "Tebu" },
  { label: "Tomat", value: "Tomat" },
];

export function FormTambah() {
  const router = useRouter();

  const form = useForm<
    z.input<typeof formSchema>,
    any,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      luas: 0,
      lokasi: "",
      tanaman: "",
      sensor: "",
      gambar: null,
    },
  });

  async function onSubmit(data: z.output<typeof formSchema>) {
    try {
      await tambahLahan(data);

      toast.success("Lahan berhasil disimpan");

      router.push("/lahan");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Gagal menyimpan data lahan");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>INFORMASI DASAR</CardTitle>
      </CardHeader>

      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nama"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nama Lahan</FieldLabel>

                  <Input
                    {...field}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <FieldDescription>Contoh: Lahan Utama</FieldDescription>
                </Field>
              )}
            />

            {/* Luas Area */}
            <Controller
              name="luas"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Luas Area (Ha)</FieldLabel>

                  <Input
                    type="number"
                    step="0.1"
                    value={field.value as number}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <FieldDescription>Contoh: 1.5</FieldDescription>
                </Field>
              )}
            />

            <Controller
              name="lokasi"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Lokasi / Desa</FieldLabel>

                  <Input {...field} aria-invalid={fieldState.invalid} />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <FieldDescription>Contoh: Desa Pancor</FieldDescription>
                </Field>
              )}
            />

            <Controller
              name="tanaman"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Jenis Tanaman</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis tanaman" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {tanaman.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="sensor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>ID Sensor</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Contoh: ESP32-002"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <FieldDescription>
                    Masukkan ID ESP32. Contoh: ESP32-001, ESP32-002.
                  </FieldDescription>
                </Field>
              )}
            />

            <Controller
              name="gambar"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Gambar Lahan</FieldLabel>

                  <div
                    className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary"
                    onClick={() =>
                      document.getElementById("fileUpload")?.click()
                    }
                  >
                    <div className="mb-2 rounded-full bg-muted p-3">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <p className="font-medium text-sm text-foreground">
                      Upload gambar lahan
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      atau{" "}
                      <span className="font-medium text-primary">
                        klik untuk memilih
                      </span>{" "}
                      (maks. 4 MB)
                    </p>

                    <Input
                      id="fileUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>

                  {field.value && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      File: {field.value.name}
                    </p>
                  )}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <FieldDescription>
                    Format yang didukung: JPG, PNG, WEBP.
                  </FieldDescription>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Link href="/lahan">
          <Button className="cursor-pointer text-emerald-950 bg-white border border-emerald-600">
            <ArrowLeft /> Batal
          </Button>
        </Link>

        <Button
          type="submit"
          form="form-rhf-demo"
          disabled={form.formState.isSubmitting}
          className="bg-emerald-600 cursor-pointer"
        >
          <Save /> Simpan
        </Button>

        <Button
          variant="outline"
          type="button"
          onClick={() => form.reset()}
          className="cursor-pointer text-emerald-950 bg-white border border-emerald-600"
        >
          <RotateCw /> Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
