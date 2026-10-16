# Conditional C++ review checks

- Identify owners, transfers and destruction for memory, handles, locks and threads. Trace invalidated iterators/references and escaping captures. Nonowning pointers/external ABI ownership differ from leaks or use-after-free.
- Trace buffer sizes, bounds, signed/unsigned conversions and arithmetic overflow with reachable inputs. C arrays/casts alone do not prove a defect; format-string/shell findings need their concrete input path.
- Verify special-member invariants and exception safety. Rule of Zero is often preferable; not every class requires all five special members. Keep resources and object state valid on failed construction/calls.
- Trace shared access, synchronization, lock order, condition predicates and shutdown. Destruction of a joinable thread may terminate; a detached thread needs safe captured lifetimes and shutdown ownership. These are different findings.
- Preserve exported layouts/calling conventions, supported standard/library and hardware/foreign-interface constraints before applying a modern application pattern.
- Establish workload evidence for copy/reserve/allocation advice. Reflexive std::move can inhibit elision or obscure lifetime; function length, nesting and auto usage are maintainability cues, not automatic blockers.
- Inspect includes, self-contained headers, ODR and compile-definition consistency across consumers. Use the actual compilation database/configuration; warning/sanitizer support varies by compiler and target.
