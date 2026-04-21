import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const colors = {
  primary: "#3498db",
  border: "#ccc",
  error: "red",
  white: "#fff",
};

const BackButton = () => (
  <TouchableOpacity style={styles.backButton}>
    <Text style={styles.backButtonText}>Back</Text>
  </TouchableOpacity>
);

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: "",
      location: "",
      email: "",
      phone: "+63",
      address: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    Alert.alert("Success", JSON.stringify(data, null, 2));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BackButton />

        <View style={styles.container}>
          <Text style={styles.header}>Profile Form</Text>

          {/* BIO */}
          <Controller
            control={control}
            name="bio"
            rules={{ required: "Bio is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Bio</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Write your bio..."
                  multiline
                />
                {errors.bio && (
                  <Text style={styles.errorText}>{errors.bio.message}</Text>
                )}
              </View>
            )}
          />

          {/* LOCATION */}
          <Controller
            control={control}
            name="location"
            rules={{ required: "Location is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Location</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your location"
                />
                {errors.location && (
                  <Text style={styles.errorText}>
                    {errors.location.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* EMAIL */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format (example@gmail.com)",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="example@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text style={styles.errorText}>
                    {errors.email.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* PHONE (+63 ONLY) */}
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Phone number is required",
              validate: (value) => {
                if (!value) return "Phone number is required";
                if (!value.startsWith("+63"))
                  return "Phone must start with +63";

                const digits = value.replace(/\D/g, "");
                if (digits.length !== 12)
                  return "Must be +63 followed by 10 digits";

                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={value}
                  placeholder="+639XXXXXXXXX"
                  keyboardType="phone-pad"
                  maxLength={13}
                  onChangeText={(text) => {
                    if (!text.startsWith("+63")) {
                      text = "+63" + text.replace(/\D/g, "");
                    }
                    onChange(text);
                  }}
                />
                {errors.phone && (
                  <Text style={styles.errorText}>
                    {errors.phone.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* ADDRESS */}
          <Controller
            control={control}
            name="address"
            rules={{ required: "Address is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <Text style={styles.errorText}>
                    {errors.address.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* SUBMIT BUTTON */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: colors.error,
    marginTop: 6,
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});