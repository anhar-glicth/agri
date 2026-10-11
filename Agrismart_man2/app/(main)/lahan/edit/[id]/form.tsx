"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCw, Save, Upload } from "lucide-react";
import Link from "next/link";
import { updateLahan } from "@/services/edit";

interface Lahan {
  id?: number;
  nama?: string;
  luas?: number;
  lokasi?: string;
  tanaman?: string;
  sensor?: string;
  gambar?: string | null;
  tanggal?: string | number;
}

interface FormEditProps {
  lahan: Lahan;
}

interface FormData {
  nama: string;
  luas: number;
  lokasi: string;
  tanaman: string;
  sensor: string;
  gambar: File | string | null;
  tanggal: string;
}

export default function FormEdit({ lahan }: FormEditProps) {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      nama: lahan?.nama ?? "",
      luas: Number(lahan?.luas ?? 0),
      lokasi: lahan?.lokasi ?? "",
      tanaman: lahan?.tanaman ?? "",
      sensor: lahan?.sensor ?? "",
      gambar: lahan?.gambar ?? null,
      tanggal: lahan?.tanggal ? String(lahan.tanggal) : "",
    },
  });

  /*
   * Jika data lahan berubah, form ikut diperbarui.
   */
  useEffect(() => {
    reset({
      nama: lahan?.nama ?? "",
      luas: Number(lahan?.luas ?? 0),
      lokasi: lahan?.lokasi ?? "",
      tanaman: lahan?.tanaman ?? "",
      sensor: lahan?.sensor ?? "",
      gambar: lahan?.gambar ?? null,
      tanggal: lahan?.tanggal ? String(lahan.tanggal) : "",
    });
  }, [lahan, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateLahan(String(lahan.id), data);

      alert("Data lahan berhasil diperbarui");

      window.location.href = "/lahan";
    } catch (error) {
      console.error("Gagal memperbarui lahan:", error);

      alert("Gagal memperbarui data lahan");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Kebun {lahan?.nama}</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="form-edit-lahan"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* NAMA LAHAN */}
          <Controller
            name="nama"
            control={control}
            rules={{
              required: "Nama lahan wajib diisi",
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nama Lahan</FieldLabel>

                <Input
                  {...field}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contoh: Lahan Utama"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                <FieldDescription>Contoh: Lahan Utama</FieldDescription>
              </Field>
            )}
          />

          {/* LUAS LAHAN */}
          <Controller
            name="luas"
            control={control}
            rules={{
              required: "Luas lahan wajib diisi",
              min: {
                value: 0,
                message: "Luas tidak boleh negatif",
              },
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Luas Lahan</FieldLabel>

                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contoh: 1.4"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                <FieldDescription>Masukkan luas lahan.</FieldDescription>
              </Field>
            )}
          />

          {/* LOKASI */}
          <Controller
            name="lokasi"
            control={control}
            rules={{
              required: "Lokasi wajib diisi",
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Lokasi / Desa</FieldLabel>

                <Input
                  {...field}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contoh: Desa Pancor"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                <FieldDescription>Contoh: Desa Pancor</FieldDescription>
              </Field>
            )}
          />

          {/* TANAMAN */}
          <Controller
            name="tanaman"
            control={control}
            rules={{
              required: "Jenis tanaman wajib diisi",
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Jenis Tanaman</FieldLabel>

                <Input
                  {...field}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contoh: Jagung"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                <FieldDescription>Contoh: Jagung</FieldDescription>
              </Field>
            )}
          />

          {/* ID SENSOR */}
          <Controller
            name="sensor"
            control={control}
            rules={{
              required: "ID sensor wajib diisi",
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>ID Sensor</FieldLabel>

                <Input
                  {...field}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contoh: ESP32-002"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                <FieldDescription>
                  Masukkan ID ESP32 yang terpasang pada lahan. Contoh: ESP32-001
                  atau ESP32-002.
                </FieldDescription>
              </Field>
            )}
          />

          {/* GAMBAR */}
          <Controller
            name="gambar"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Gambar Lahan</FieldLabel>

                <div
                  className="
                    flex cursor-pointer
                    flex-col items-center
                    justify-center
                    rounded-md
                    border-2 border-dashed
                    border-border
                    p-8
                    text-center
                    transition-colors
                    hover:border-primary
                  "
                  onClick={() => document.getElementById("fileUpload")?.click()}
                >
                  <div className="mb-2 rounded-full bg-muted p-3">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <p className="text-sm font-medium">Upload gambar lahan</p>

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
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;

                      field.onChange(file);
                    }}
                  />
                </div>

                {field.value instanceof File && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    File: {field.value.name}
                  </p>
                )}

                {typeof field.value === "string" && field.value && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Gambar saat ini: {field.value}
                  </p>
                )}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                <FieldDescription>
                  Format yang didukung: JPG, PNG, WEBP. Maksimal 4 MB.
                </FieldDescription>
              </Field>
            )}
          />

          {/* TANGGAL */}
          <Controller
            name="tanggal"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Tanggal</FieldLabel>

                <Input type="date" {...field} value={field.value ?? ""} />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {/* BATAL */}
        <Link href="/lahan">
          <Button
            type="button"
            className="
              cursor-pointer
              border border-emerald-600
              bg-white
              text-emerald-950
              hover:bg-emerald-50
            "
          >
            <ArrowLeft />
            Batal
          </Button>
        </Link>

        {/* SIMPAN */}
        <Button
          type="submit"
          form="form-edit-lahan"
          className="
            cursor-pointer
            bg-emerald-600
            hover:bg-emerald-700
          "
        >
          <Save />
          Simpan
        </Button>

        {/* RESET */}
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            reset({
              nama: lahan?.nama ?? "",
              luas: Number(lahan?.luas ?? 0),
              lokasi: lahan?.lokasi ?? "",
              tanaman: lahan?.tanaman ?? "",
              sensor: lahan?.sensor ?? "",
              gambar: lahan?.gambar ?? null,
              tanggal: lahan?.tanggal ? String(lahan.tanggal) : "",
            })
          }
          className="
            cursor-pointer
            border border-emerald-600
            bg-white
            text-emerald-950
            hover:bg-emerald-50
          "
        >
          <RotateCw />
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
