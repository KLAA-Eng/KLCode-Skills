## Core Concepts

- **TDD loop**: red → green → refactor (tests first, minimal fix, then cleanups).
- **Isolation**: prefer dependency injection and fakes over global state.
- **Test layout**: `tests/unit`, `tests/integration`, `tests/testdata`.
- **Mocks vs fakes**: mock for interactions, fake for stateful behavior.
- **CTest discovery**: use `gtest_discover_tests()` for stable test discovery.
- **CI signal**: run subset first, then full suite with `--output-on-failure`.


## Code Examples

### Basic Unit Test (gtest)

```cpp
// tests/calculator_test.cpp
#include <gtest/gtest.h>

int Add(int a, int b); // Provided by production code.

TEST(CalculatorTest, AddsTwoNumbers) {
    EXPECT_EQ(Add(2, 3), 5);
}
```

### Fixture (gtest)

```cpp
// tests/user_store_test.cpp
// Pseudocode stub: replace UserStore/User with project types.
#include <gtest/gtest.h>
#include <memory>
#include <optional>
#include <string>

struct User { std::string name; };
class UserStore {
public:
    explicit UserStore(std::string /*path*/) {}
    void Seed(std::initializer_list<User> /*users*/) {}
    std::optional<User> Find(const std::string &/*name*/) { return User{"alice"}; }
};

class UserStoreTest : public ::testing::Test {
protected:
    void SetUp() override {
        store = std::make_unique<UserStore>(":memory:");
        store->Seed({{"alice"}, {"bob"}});
    }

    std::unique_ptr<UserStore> store;
};

TEST_F(UserStoreTest, FindsExistingUser) {
    auto user = store->Find("alice");
    ASSERT_TRUE(user.has_value());
    EXPECT_EQ(user->name, "alice");
}
```

### Mock (gmock)

```cpp
// tests/notifier_test.cpp
#include <gmock/gmock.h>
#include <gtest/gtest.h>
#include <string>

class Notifier {
public:
    virtual ~Notifier() = default;
    virtual void Send(const std::string &message) = 0;
};

class MockNotifier : public Notifier {
public:
    MOCK_METHOD(void, Send, (const std::string &message), (override));
};

class Service {
public:
    explicit Service(Notifier &notifier) : notifier_(notifier) {}
    void Publish(const std::string &message) { notifier_.Send(message); }

private:
    Notifier &notifier_;
};

TEST(ServiceTest, SendsNotifications) {
    MockNotifier notifier;
    Service service(notifier);

    EXPECT_CALL(notifier, Send("hello")).Times(1);
    service.Publish("hello");
}
```

### CMake/CTest Quickstart

```cmake
# CMakeLists.txt (excerpt)
cmake_minimum_required(VERSION 3.20)
project(example LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)
# Prefer project-locked versions. If using a tag, use a pinned version per project policy.
set(GTEST_VERSION v1.17.0) # Adjust to project policy.
FetchContent_Declare(
  googletest
  # Google Test framework (official repository)
  URL https://github.com/google/googletest/archive/refs/tags/${GTEST_VERSION}.zip
)
FetchContent_MakeAvailable(googletest)

add_executable(example_tests
  tests/calculator_test.cpp
  src/calculator.cpp
)
target_link_libraries(example_tests GTest::gtest GTest::gmock GTest::gtest_main)

enable_testing()
include(GoogleTest)
gtest_discover_tests(example_tests)
```

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build -j
ctest --test-dir build --output-on-failure
```


## Running Tests

```bash
ctest --test-dir build --output-on-failure
ctest --test-dir build -R ClampTest
ctest --test-dir build -R "UserStoreTest.*" --output-on-failure
```

```bash
./build/example_tests --gtest_filter=ClampTest.*
./build/example_tests --gtest_filter=UserStoreTest.FindsExistingUser
```


## Alternatives to GoogleTest

- **Catch2**: header-only, expressive matchers
- **doctest**: lightweight, minimal compile overhead
