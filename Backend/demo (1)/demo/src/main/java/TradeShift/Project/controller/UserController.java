package TradeShift.Project.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import TradeShift.Project.entity.User;
import TradeShift.Project.security.JwtUtil;
import TradeShift.Project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

        import java.util.HashMap;
import java.util.Map;
import java.util.Collections;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ===============================
    // 🔹 1. REGISTER USER - No need to protect this endpoint, public access allowed
    // ===============================
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        System.out.println("Register endpoint hit for user: " + user.getUsername());
        return ResponseEntity.ok(userService.registerUser(user));
    }

    // ===============================
    // 🔹 2. LOGIN USER (JWT GENERATION) with role included in token
    // ===============================
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        System.out.println("Login endpoint hit for: " + user.getUsername());
        User existingUser = userService.findByUsername(user.getUsername());

        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            // Pass role as claims to JWT generator
            String token = jwtUtil.generateToken(existingUser.getUsername(), existingUser.getRole().name());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response); // JSON: { "token": "..." }
        }
        return ResponseEntity.status(401).body(Collections.singletonMap("error", "Invalid username or password"));
    }

    // ===============================
    // 🔹 3. UPDATE USER DETAILS (JWT REQUIRED, protected by USER or ADMIN)
    // ===============================
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User updatedUser) {
        System.out.println("Update endpoint hit for username: " + username);

        User existingUser = userService.findByUsername(username);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }

        // Update allowed fields
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        existingUser.setDateOfBirth(updatedUser.getDateOfBirth());
        existingUser.setGender(updatedUser.getGender());
        existingUser.setAccountType(updatedUser.getAccountType());

        User savedUser = userService.updateUser(existingUser);
        return ResponseEntity.ok(savedUser);
    }

    // ===============================
    // 🔹 4. GET USER PROFILE (JWT REQUIRED, protected by USER or ADMIN)
    // ===============================
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/profile/{username}")
    public ResponseEntity<User> getUserProfile(@PathVariable String username) {
        System.out.println("Profile endpoint hit for username: " + username);
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
}
