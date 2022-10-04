import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import { alpha, Box, Card, Stack, Typography } from "@mui/material";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "./postSlice";

export default function EditPopper({ content, image, postId, handleMenuClose }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const yupSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
  });
  const defaultValues = { content, image };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.post);

  const onSubmit = (data) => {
    handleMenuClose();
    handleClose();
    dispatch(editPost({ content: data.content, image: data.image, postId }));
  };

  const handleDrop = React.useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "image",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  return (
    <div>
      <Typography variant="body2" onClick={handleClickOpen}>
        Edit
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"This post will be permanent changed after your confirmation"}
        </DialogTitle>
        <DialogContent>
          <Card sx={{ p: 3 }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FTextField
                  name="content"
                  multiline
                  fullWidth
                  rows={4}
                  sx={{
                    "& fieldset": {
                      borderWidth: `1px !important`,
                      borderColor: alpha("#919EAB", 0.32),
                    },
                  }}
                />
                <FUploadImage
                  name="image"
                  accept="image/*"
                  maxSize={32145728}
                  onDrop={handleDrop}
                  preview={image ? image : null}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleClose}
                    sx={{ mr: 1 }}
                    color="error"
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="small"
                    loading={isSubmitting || isLoading}
                  >
                    Post
                  </LoadingButton>
                </Box>
              </Stack>
            </FormProvider>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
