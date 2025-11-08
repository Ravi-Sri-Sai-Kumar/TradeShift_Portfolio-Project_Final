import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Profile Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Trader" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>

          <Button className="mt-4">Save Changes</Button>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Security</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>

          <Button className="mt-4">Update Password</Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your trades
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Price Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when stock prices change significantly
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Trade Confirmations</Label>
              <p className="text-sm text-muted-foreground">
                Receive confirmation for completed trades
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Trading Preferences */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Trading Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Refresh Prices</Label>
              <p className="text-sm text-muted-foreground">
                Automatically update stock prices every 30 seconds
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Order Confirmation</Label>
              <p className="text-sm text-muted-foreground">
                Show confirmation dialog before placing orders
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="defaultQuantity">Default Order Quantity</Label>
            <Input
              id="defaultQuantity"
              type="number"
              defaultValue="10"
              className="max-w-xs"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
