## Resource Management (R.*)

### Key Rules

| Rule | Summary |
|------|---------|
| **R.1** | Manage resources automatically using RAII |
| **R.3** | A raw pointer (`T*`) is non-owning |
| **R.5** | Prefer scoped objects; don't heap-allocate unnecessarily |
| **R.10** | Avoid `malloc()`/`free()` |
| **R.11** | Avoid calling `new` and `delete` explicitly |
| **R.20** | Use `unique_ptr` or `shared_ptr` to represent ownership |
| **R.21** | Prefer `unique_ptr` over `shared_ptr` unless sharing ownership |
| **R.22** | Use `make_shared()` to make `shared_ptr`s |

### Smart Pointer Usage

```cpp
// R.11 + R.20 + R.21: RAII with smart pointers
auto widget = std::make_unique<Widget>("config");  // unique ownership
auto cache  = std::make_shared<Cache>(1024);        // shared ownership

// R.3: Raw pointer = non-owning observer
void render(const Widget* w) {  // does NOT own w
    if (w) w->draw();
}

render(widget.get());
```

### RAII Pattern

```cpp
// R.1: Resource acquisition is initialization
class FileHandle {
public:
    explicit FileHandle(const std::string& path)
        : handle_(std::fopen(path.c_str(), "r")) {
        if (!handle_) throw std::runtime_error("Failed to open: " + path);
    }

    ~FileHandle() {
        if (handle_) std::fclose(handle_);
    }

    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
    FileHandle(FileHandle&& other) noexcept
        : handle_(std::exchange(other.handle_, nullptr)) {}
    FileHandle& operator=(FileHandle&& other) noexcept {
        if (this != &other) {
            if (handle_) std::fclose(handle_);
            handle_ = std::exchange(other.handle_, nullptr);
        }
        return *this;
    }

private:
    std::FILE* handle_;
};
```

### Anti-Patterns

- Naked `new`/`delete` (R.11)
- `malloc()`/`free()` in C++ code (R.10)
- Multiple resource allocations in a single expression (R.13 -- exception safety hazard)
- `shared_ptr` where `unique_ptr` suffices (R.21)


## Expressions & Statements (ES.*)

### Key Rules

| Rule | Summary |
|------|---------|
| **ES.5** | Keep scopes small |
| **ES.20** | Always initialize an object |
| **ES.23** | Prefer `{}` initializer syntax |
| **ES.25** | Declare objects `const` or `constexpr` unless modification is intended |
| **ES.28** | Use lambdas for complex initialization of `const` variables |
| **ES.45** | Avoid magic constants; use symbolic constants |
| **ES.46** | Avoid narrowing/lossy arithmetic conversions |
| **ES.47** | Use `nullptr` rather than `0` or `NULL` |
| **ES.48** | Avoid casts |
| **ES.50** | Don't cast away `const` |

### Initialization

```cpp
// ES.20 + ES.23 + ES.25: Always initialize, prefer {}, default to const
const int max_retries{3};
const std::string name{"widget"};
const std::vector<int> primes{2, 3, 5, 7, 11};

// ES.28: Lambda for complex const initialization
const auto config = [&] {
    Config c;
    c.timeout = std::chrono::seconds{30};
    c.retries = max_retries;
    c.verbose = debug_mode;
    return c;
}();
```

### Anti-Patterns

- Uninitialized variables (ES.20)
- Using `0` or `NULL` as pointer (ES.47 -- use `nullptr`)
- C-style casts (ES.48 -- use `static_cast`, `const_cast`, etc.)
- Casting away `const` (ES.50)
- Magic numbers without named constants (ES.45)
- Mixing signed and unsigned arithmetic (ES.100)
- Reusing names in nested scopes (ES.12)


## Error Handling (E.*)

### Key Rules

| Rule | Summary |
|------|---------|
| **E.1** | Develop an error-handling strategy early in a design |
| **E.2** | Throw an exception to signal that a function can't perform its assigned task |
| **E.6** | Use RAII to prevent leaks |
| **E.12** | Use `noexcept` when throwing is impossible or unacceptable |
| **E.14** | Use purpose-designed user-defined types as exceptions |
| **E.15** | Throw by value, catch by reference |
| **E.16** | Destructors, deallocation, and swap must never fail |
| **E.17** | Don't try to catch every exception in every function |

### Exception Hierarchy

```cpp
// E.14 + E.15: Custom exception types, throw by value, catch by reference
class AppError : public std::runtime_error {
public:
    using std::runtime_error::runtime_error;
};

class NetworkError : public AppError {
public:
    NetworkError(const std::string& msg, int code)
        : AppError(msg), status_code(code) {}
    int status_code;
};

void fetch_data(const std::string& url) {
    // E.2: Throw to signal failure
    throw NetworkError("connection refused", 503);
}

void run() {
    try {
        fetch_data("https://api.example.com");
    } catch (const NetworkError& e) {
        log_error(e.what(), e.status_code);
    } catch (const AppError& e) {
        log_error(e.what());
    }
    // E.17: Don't catch everything here -- let unexpected errors propagate
}
```

### Anti-Patterns

- Throwing built-in types like `int` or string literals (E.14)
- Catching by value (slicing risk) (E.15)
- Empty catch blocks that silently swallow errors
- Using exceptions for flow control (E.3)
- Error handling based on global state like `errno` (E.28)


## Constants & Immutability (Con.*)

### All Rules

| Rule | Summary |
|------|---------|
| **Con.1** | By default, make objects immutable |
| **Con.2** | By default, make member functions `const` |
| **Con.3** | By default, pass pointers and references to `const` |
| **Con.4** | Use `const` for values that don't change after construction |
| **Con.5** | Use `constexpr` for values computable at compile time |

```cpp
// Con.1 through Con.5: Immutability by default
class Sensor {
public:
    explicit Sensor(std::string id) : id_(std::move(id)) {}

    // Con.2: const member functions by default
    const std::string& id() const { return id_; }
    double last_reading() const { return reading_; }

    // Only non-const when mutation is required
    void record(double value) { reading_ = value; }

private:
    const std::string id_;  // Con.4: never changes after construction
    double reading_{0.0};
};

// Con.3: Pass by const reference
void display(const Sensor& s) {
    std::cout << s.id() << ": " << s.last_reading() << '\n';
}

// Con.5: Compile-time constants
constexpr double PI = 3.14159265358979;
constexpr int MAX_SENSORS = 256;
```
