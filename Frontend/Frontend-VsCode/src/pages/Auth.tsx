import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import API from "../lib/api";

// FIELD-MAPPER: matches backend User object fields!
function mapFields(formData: any) {
  return {
    firstName: formData.firstname,
    lastName: formData.lastname,
    dateOfBirth: formData.dob,
    phoneNumber: formData.phone,
    gender: formData.gender,
    accountType: formData.accounttype,
    username: formData.username,
    password: formData.password,
    role: formData.role,
    email: formData.username // or use actual email field
  };
}

const formFields = [
  { key: "firstname", type: "text", label: "First Name" },
  { key: "lastname", type: "text", label: "Last Name" },
  { key: "dob", type: "date", label: "Date Of Birth" },
  { key: "phone", type: "tel", label: "Phone Number" },
  { key: "gender", type: "select", label: "Gender", options: ["", "male", "female", "others"] },
  { key: "accounttype", type: "select", label: "Account Type", options: ["individual", "business", "joint"] },
  { key: "username", type: "email", label: "Username (Email)" },
  { key: "password", type: "password", label: "Password" },
];

const initialAdminState = {
  firstname: "",
  lastname: "",
  dob: "",
  phone: "",
  gender: "",
  accounttype: "admin",
  username: "",
  password: "",
  role: "ROLE_ADMIN",
};
const initialUserState = {
  firstname: "",
  lastname: "",
  dob: "",
  phone: "",
  gender: "",
  accounttype: "individual",
  username: "",
  password: "",
  role: "ROLE_USER",
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const phoneRegex = /^[6-9]\d{9}$/;

function FormInput({ id, label, type, options, value, onChange, error, readOnly }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
            error ? "border-destructive" : ""
          }`}
        >
          <option value="">Select {label}</option>
          {options?.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={error ? "border-destructive" : ""}
        />
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

const Auth = () => {
  const [adminFormData, setAdminFormData] = useState({ ...initialAdminState });
  const [userFormData, setUserFormData] = useState({ ...initialUserState });
  const [adminErrors, setAdminErrors] = useState<Record<string, string>>({});
  const [userErrors, setUserErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  // Stable handlers
  const handleAdminChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = e.target.id.split("-")[2];
    setAdminFormData((prev) => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handleUserChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = e.target.id.split("-")[2];
    setUserFormData((prev) => ({ ...prev, [field]: e.target.value }));
  }, []);

  const validateForm = (formData: typeof initialAdminState) => {
    const errors: Record<string, string> = {};
    if (!formData.firstname) errors.firstname = "First name is required";
    if (!formData.lastname) errors.lastname = "Last name is required";
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!formData.phone || !phoneRegex.test(formData.phone))
      errors.phone = "Valid 10-digit mobile number";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.username || !emailRegex.test(formData.username))
      errors.username = "Use a valid @gmail.com email";
    if (!formData.password || !passwordRegex.test(formData.password))
      errors.password = "8+ chars, include uppercase, lowercase, number & symbol";
    return errors;
  };

  // Submit functions: POST → navigate to /login on success
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(adminFormData);
    setAdminErrors(errors);
    if (Object.keys(errors).length) return;
    try {
      const payload = mapFields(adminFormData);
      await API.post("/auth/register", payload);
      toast({ title: "Admin Registered", description: "Admin created successfully" });
      navigate("/login"); // Fixed: Go to login after registration
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.response?.data?.error || err.message });
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(userFormData);
    setUserErrors(errors);
    if (Object.keys(errors).length) return;
    try {
      const payload = mapFields(userFormData);
      await API.post("/auth/register", payload);
      toast({ title: "User Registered", description: "User created successfully" });
      navigate("/login"); // Fixed: Go to login after registration
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.response?.data?.error || err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="flex gap-12 w-full max-w-5xl">
        {/* Admin Section */}
        <Card className="flex-1 p-6 bg-card border-border">
          <div className="text-center space-y-2 mb-4">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500">
                <TrendingUp className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">TradeShift Admin</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Admin Section</h2>
            <p className="text-muted-foreground">Enter admin registration details.</p>
          </div>
          <form autoComplete="off" onSubmit={handleAdminSubmit} className="space-y-4">
            {formFields.map((f) => (
              <FormInput
                key={`admin-${f.key}`}
                id={`admin-form-${f.key}`}
                label={f.label}
                type={f.type}
                options={f.key === "accounttype" ? ["admin"] : f.options}
                value={adminFormData[f.key]}
                onChange={handleAdminChange}
                error={adminErrors[f.key]}
              />
            ))}
            <FormInput
              key="admin-role"
              id="admin-form-role"
              label="Role"
              type="text"
              value={adminFormData.role}
              onChange={() => {}}
              readOnly
            />
            <Button type="submit" className="w-full" size="lg">
              Create Admin Account
            </Button>
          </form>
        </Card>
        {/* User Section */}
        <Card className="flex-1 p-6 bg-card border-border">
          <div className="text-center space-y-2 mb-4">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500">
                <TrendingUp className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">TradeShift User</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground">User Section</h2>
            <p className="text-muted-foreground">Enter user registration details.</p>
          </div>
          <form autoComplete="off" onSubmit={handleUserSubmit} className="space-y-4">
            {formFields.map((f) => (
              <FormInput
                key={`user-${f.key}`}
                id={`user-form-${f.key}`}
                label={f.label}
                type={f.type}
                options={f.options}
                value={userFormData[f.key]}
                onChange={handleUserChange}
                error={userErrors[f.key]}
              />
            ))}
            <FormInput
              key="user-role"
              id="user-form-role"
              label="Role"
              type="text"
              value={userFormData.role}
              onChange={() => {}}
              readOnly
            />
            <Button type="submit" className="w-full" size="lg">
              Create User Account
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
