(() => {
  "use strict";

  const BOOKS_KEY = "shelf-reader-books";
  const REQUESTS_KEY = "shelf-reader-requests";
  const THEME_KEY = "shelf-reader-theme";
  const USERS_KEY = "shelf-reader-users";
  const CURRENT_USER_KEY = "shelf-reader-current-user";
  const seedBooks = [
    { id: "seed-1", title: "عزازيل", author: "يوسف زيدان", category: "روايات", condition: "شبه جديد", type: "sale", price: 180, notes: "نسخة نظيفة، والغلاف بحالة ممتازة.", city: "القاهرة", delivery: ["مقابلة يداً بيد"], images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=85"], status: "active", seller: "سارة أحمد", rating: "٤٫٩ (١٨ تقييماً)" },
    { id: "seed-2", title: "فن اللامبالاة", author: "مارك مانسون", category: "دراسة أكاديمية", condition: "متوسط وبه ملاحظات", type: "trade", tradeWanted: "كتب في علم النفس أو تطوير الذات", notes: "توجد ملاحظات بسيطة بالقلم الرصاص في بعض الصفحات.", city: "الجيزة", delivery: ["مقابلة يداً بيد", "شحن"], images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=85"], status: "active", seller: "عمر خالد", rating: "٤٫٨ (١٢ تقييماً)" },
    { id: "seed-3", title: "مقدمة ابن خلدون", author: "ابن خلدون", category: "دراسة أكاديمية", condition: "شبه جديد", type: "sale", price: 240, notes: "", city: "الإسكندرية", delivery: ["شحن"], images: ["https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=85"], status: "active", seller: "ندى محمود", rating: "٥٫٠ (٧ تقييمات)" },
    { id: "seed-4", title: "تعلم بايثون خطوة بخطوة", author: "أحمد سالم", category: "برمجة", condition: "جديد", type: "trade", tradeWanted: "كتب برمجة أو روايات خيال علمي", notes: "لم يُستخدم، وما زال بحالة ممتازة.", city: "القاهرة", delivery: ["مقابلة يداً بيد"], images: ["https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=85"], status: "active", seller: "مروان عادل", rating: "٤٫٧ (٩ تقييمات)" },
    { id: "seed-5", title: "مئة عام من العزلة", author: "غابرييل غارسيا ماركيز", category: "روايات", condition: "شبه جديد", type: "sale", price: 150, notes: "ترجمة عربية جميلة، لا توجد كتابة داخلية.", city: "المنصورة", delivery: ["مقابلة يداً بيد", "شحن"], images: ["https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=85"], status: "active", seller: "ليلى سمير", rating: "٤٫٩ (٢١ تقييماً)" },
    { id: "seed-6", title: "أساسيات علم الأدوية", author: "محمد عبد الرحمن", category: "طب", condition: "متوسط وبه ملاحظات", type: "sale", price: 320, notes: "ملاحظات دراسية مفيدة في بعض الفصول.", city: "الجيزة", delivery: ["مقابلة يداً بيد"], images: ["https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?auto=format&fit=crop&w=800&q=85"], status: "active", seller: "يوسف عماد", rating: "٤٫٨ (١٥ تقييماً)" }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  function getBooks() {
    try {
      const saved = localStorage.getItem(BOOKS_KEY);
      if (saved === null) return seedBooks.map(book => ({ ...book }));
      const books = JSON.parse(saved);
      return Array.isArray(books) ? books : seedBooks.map(book => ({ ...book }));
    } catch (error) {
      console.error("تعذر قراءة الكتب المحفوظة:", error);
      return seedBooks.map(book => ({ ...book }));
    }
  }

  function saveBooks(books) {
    try {
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
      return true;
    } catch (error) {
      console.error("تعذر حفظ الكتب:", error);
      showToast("تعذر حفظ الإعلان في هذا المتصفح. قد تكون مساحة التخزين ممتلئة.");
      return false;
    }
  }

  function getRequests() {
    try {
      const requests = JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]");
      return Array.isArray(requests) ? requests : [];
    } catch (error) {
      console.error("تعذر قراءة الطلبات المحفوظة:", error);
      showToast("تعذر تحميل سجل الطلبات المحفوظ.");
      return [];
    }
  }

  function saveRequests(requests) {
    try {
      localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
      return true;
    } catch (error) {
      console.error("تعذر حفظ الطلب:", error);
      showToast("تعذر حفظ الطلب في هذا المتصفح.");
      return false;
    }
  }

  function getUsers() {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      return Array.isArray(users) ? users : [];
    } catch (error) {
      console.error("تعذر قراءة الحسابات المحفوظة:", error);
      showToast("تعذر تحميل بيانات الحسابات المحفوظة.");
      return [];
    }
  }

  function getCurrentUser() {
    try {
      const sessionUser = sessionStorage.getItem(CURRENT_USER_KEY);
      const rememberedUser = localStorage.getItem(CURRENT_USER_KEY);
      const user = JSON.parse(sessionUser || rememberedUser || "null");
      return user && typeof user.name === "string" ? user : null;
    } catch (error) {
      console.error("تعذر استعادة جلسة المستخدم:", error);
      return null;
    }
  }

  function clearFieldError(field) {
    field.classList.remove("invalid");
    const error = field.parentElement.querySelector(".field-error");
    if (error) error.classList.add("hidden");
  }

  function showFieldError(field, message) {
    field.classList.add("invalid");
    const error = field.parentElement.querySelector(".field-error");
    if (error) {
      if (message) error.textContent = message;
      error.classList.remove("hidden");
    }
    field.focus();
  }

  function toHex(bytes) {
    return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, "0")).join("");
  }

  function fromHex(value) {
    const bytes = new Uint8Array(value.length / 2);
    for (let index = 0; index < bytes.length; index += 1) bytes[index] = Number.parseInt(value.slice(index * 2, index * 2 + 2), 16);
    return bytes;
  }

  async function hashPassword(password, salt) {
    if (!window.crypto?.subtle) throw new Error("خدمة التشفير غير متاحة في هذا السياق.");
    const key = await window.crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
    const digest = await window.crypto.subtle.deriveBits({ name: "PBKDF2", salt: fromHex(salt), iterations: 120000, hash: "SHA-256" }, key, 256);
    return toHex(digest);
  }

  function setCurrentUser(user, remember) {
    try {
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      if (remember) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(CURRENT_USER_KEY);
      return true;
    } catch (error) {
      console.error("تعذر حفظ جلسة المستخدم:", error);
      showToast("تعذر بدء الجلسة بسبب إعدادات التخزين في المتصفح.");
      return false;
    }
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) {
      window.alert(message);
      return;
    }
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 3500);
  }

  function imageMarkup(book, index = 0, className = "book-cover") {
    const image = book.images && book.images[index];
    if (image) return `<img class="${className}" src="${escapeHTML(image)}" alt="صورة كتاب ${escapeHTML(book.title)}" data-cover-fallback="${escapeHTML(book.title)}">`;
    return `<span class="cover-placeholder tone-${(Number(String(book.id).replace(/\D/g, "").slice(-1)) || 1) % 6 + 1}">${escapeHTML(book.title)}</span>`;
  }

  document.addEventListener("error", event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.dataset.coverFallback || image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = "true";
    const placeholder = document.createElement("span");
    placeholder.className = "cover-placeholder";
    placeholder.textContent = image.dataset.coverFallback;
    image.replaceWith(placeholder);
  }, true);

  function bookCard(book, tradeCard = false) {
    const isTrade = book.type === "trade";
    const cover = `<a class="book-cover-link" href="book-details.html?id=${encodeURIComponent(book.id)}">${imageMarkup(book)}<span class="book-badge">${isTrade ? "متاح للبدل" : "للبيع"}</span></a>`;
    const notes = book.notes ? `<p class="book-notes">${escapeHTML(book.notes)}</p>` : "";
    const tradeWanted = tradeCard && isTrade ? `<p class="trade-wanted"><strong>يقبل التبادل بـ:</strong> ${escapeHTML(book.tradeWanted || "كتب من اختيارك")}</p>` : "";
    const price = isTrade ? "متاح للبدل" : `${escapeHTML(book.price)} ج.م`;
    return `<article class="book-card${tradeCard ? " trade-card" : ""}">${cover}<div class="book-card-body"><a class="book-title" href="book-details.html?id=${encodeURIComponent(book.id)}">${escapeHTML(book.title)}</a><p class="book-author">${escapeHTML(book.author)}</p>${notes}${tradeWanted}<div class="book-meta"><span class="book-price">${price}</span><span class="book-condition">${escapeHTML(book.condition || "")}</span></div><span class="book-city">⌖ ${escapeHTML(book.city || "")}</span>${tradeCard ? `<a class="card-action" href="book-details.html?id=${encodeURIComponent(book.id)}">اقترح كتاباً للتبادل ←</a>` : ""}</div></article>`;
  }

  function initTheme() {
    let theme = "light";
    try {
      theme = localStorage.getItem(THEME_KEY) || "light";
    } catch (error) {
      console.error("تعذر استعادة إعداد المظهر:", error);
    }
    document.documentElement.dataset.theme = theme;
    const toggle = $(".theme-toggle");
    if (!toggle) return;
    const updateLabel = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      toggle.innerHTML = `<span aria-hidden="true">${dark ? "☀" : "☾"}</span>`;
      toggle.setAttribute("aria-label", dark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي");
    };
    updateLabel();
    toggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        console.error("تعذر حفظ إعداد المظهر:", error);
        showToast("تعذر حفظ الوضع المختار، لكن يمكنك متابعة التصفح.");
      }
      updateLabel();
    });
  }

  function initNavigation() {
    const toggle = $(".menu-toggle");
    const nav = $(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
    const accountLink = $(".auth-nav-link", nav);
    if (accountLink) {
      const user = getCurrentUser();
      if (user) {
        accountLink.textContent = "تسجيل الخروج";
        accountLink.href = "#logout";
        accountLink.setAttribute("aria-label", `تسجيل الخروج من حساب ${user.name}`);
        accountLink.addEventListener("click", event => {
          event.preventDefault();
          try {
            sessionStorage.removeItem(CURRENT_USER_KEY);
            localStorage.removeItem(CURRENT_USER_KEY);
          } catch (error) {
            console.error("تعذر إنهاء جلسة المستخدم:", error);
            showToast("تعذر إنهاء الجلسة. أغلق المتصفح وأعد فتحه للمحاولة.");
            return;
          }
          window.location.href = "index.html";
        });
      }
    }
  }

  function initAuth() {
    if (document.body.dataset.page !== "auth") return;
    const loginPanel = $("#login-panel");
    const registerPanel = $("#register-panel");
    const loginTab = $("#tab-login");
    const registerTab = $("#tab-register");
    const tabs = [[loginTab, loginPanel], [registerTab, registerPanel]];
    const setTab = activeTab => {
      tabs.forEach(([tab, panel]) => {
        const active = tab === activeTab;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        panel.classList.toggle("hidden", !active);
      });
    };
    loginTab.addEventListener("click", () => setTab(loginTab));
    registerTab.addEventListener("click", () => setTab(registerTab));
    tabs.forEach(([tab], index) => tab.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const next = tabs[1 - index][0];
      setTab(next);
      next.focus();
    }));

    $$("#login-form input, #register-form input, #register-form select").forEach(field => {
      field.addEventListener("input", () => clearFieldError(field));
      field.addEventListener("change", () => clearFieldError(field));
    });

    $("#register-form").addEventListener("submit", async event => {
      event.preventDefault();
      const name = $("#reg-name");
      const email = $("#reg-email");
      const city = $("#reg-city");
      const password = $("#reg-password");
      const required = [name, email, city, password];
      required.forEach(clearFieldError);
      const invalid = required.find(field => !field.value.trim() || !field.checkValidity());
      if (invalid) {
        showFieldError(invalid);
        return;
      }
      const normalizedEmail = email.value.trim().toLocaleLowerCase("en");
      const users = getUsers();
      if (users.some(user => user.email === normalizedEmail)) {
        setTab(loginTab);
        showFieldError($("#login-email"), "يوجد حساب بهذا البريد بالفعل. سجّل الدخول.");
        $("#login-email").value = normalizedEmail;
        return;
      }
      const submit = $('button[type="submit"]', event.currentTarget);
      submit.disabled = true;
      try {
        const salt = toHex(window.crypto.getRandomValues(new Uint8Array(16)));
        const passwordHash = await hashPassword(password.value, salt);
        const user = { id: `user-${Date.now()}`, name: name.value.trim(), email: normalizedEmail, city: city.value };
        const nextUsers = [...users, { ...user, salt, passwordHash }];
        localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
        if (!setCurrentUser(user, true)) return;
        showToast("تم إنشاء الحساب وتسجيل الدخول بنجاح.");
        window.setTimeout(() => { window.location.href = "my-shelf.html"; }, 600);
      } catch (error) {
        console.error("تعذر إنشاء الحساب:", error);
        showToast("تعذر إنشاء الحساب في هذا المتصفح. افتح الموقع عبر خادم محلي يدعم Web Crypto.");
      } finally {
        submit.disabled = false;
      }
    });

    $("#login-form").addEventListener("submit", async event => {
      event.preventDefault();
      const email = $("#login-email");
      const password = $("#login-password");
      [email, password].forEach(clearFieldError);
      if (!email.value.trim() || !email.checkValidity()) {
        showFieldError(email);
        return;
      }
      if (!password.value) {
        showFieldError(password);
        return;
      }
      const normalizedEmail = email.value.trim().toLocaleLowerCase("en");
      const user = getUsers().find(item => item.email === normalizedEmail);
      if (!user) {
        showFieldError(email, "لم نعثر على حساب بهذا البريد الإلكتروني.");
        return;
      }
      try {
        const passwordHash = await hashPassword(password.value, user.salt);
        if (passwordHash !== user.passwordHash) {
          showFieldError(password, "كلمة المرور غير صحيحة.");
          return;
        }
        const { passwordHash: _passwordHash, salt: _salt, ...publicUser } = user;
        if (!setCurrentUser(publicUser, $("#remember-me").checked)) return;
        showToast("تم تسجيل الدخول بنجاح.");
        window.setTimeout(() => { window.location.href = "my-shelf.html"; }, 600);
      } catch (error) {
        console.error("تعذر تسجيل الدخول:", error);
        showToast("تعذر التحقق من الحساب في هذا المتصفح. افتح الموقع عبر خادم محلي يدعم Web Crypto.");
      }
    });

    const existingUser = getCurrentUser();
    if (existingUser) showToast(`أنت مسجّل الدخول بالفعل، ${existingUser.name}.`);
  }

  function initHome() {
    const grid = $("#books-grid");
    if (!grid) return;
    const books = getBooks().filter(book => book.status !== "completed");
    const search = $("#book-search");
    const condition = $("#condition-filter");
    const city = $("#city-filter");
    const count = $("#results-count");
    const empty = $("#empty-state");
    let type = "all";
    let category = "الكل";

    const render = () => {
      const query = (search.value || "").trim().toLocaleLowerCase("ar");
      const matches = books.filter(book => {
        const searchable = `${book.title} ${book.author} ${book.category} ${book.notes || ""}`.toLocaleLowerCase("ar");
        return (!query || searchable.includes(query))
          && (type === "all" || book.type === type)
          && (category === "الكل" || book.category === category)
          && (!condition.value || book.condition === condition.value)
          && (!city.value || book.city === city.value);
      });
      grid.innerHTML = matches.map(book => bookCard(book)).join("");
      count.textContent = `عرض ${matches.length} ${matches.length === 1 ? "كتاب" : "كتب"}`;
      empty.classList.toggle("hidden", matches.length > 0);
      grid.classList.toggle("hidden", matches.length === 0);
    };

    $("#search-form").addEventListener("submit", event => { event.preventDefault(); render(); });
    search.addEventListener("input", render);
    condition.addEventListener("change", render);
    city.addEventListener("change", render);
    $$(".filter-option").forEach(button => button.addEventListener("click", () => {
      $$(".filter-option").forEach(option => option.classList.toggle("active", option === button));
      type = button.dataset.type;
      render();
    }));
    $$(".category-chip").forEach(button => button.addEventListener("click", () => {
      $$(".category-chip").forEach(option => option.classList.toggle("active", option === button));
      category = button.dataset.category;
      render();
      $("#books").scrollIntoView({ behavior: "smooth", block: "start" });
    }));
    const clear = () => {
      search.value = "";
      condition.value = "";
      city.value = "";
      type = "all";
      category = "الكل";
      $$(".filter-option").forEach(option => option.classList.toggle("active", option.dataset.type === "all"));
      $$(".category-chip").forEach(option => option.classList.toggle("active", option.dataset.category === "الكل"));
      render();
    };
    $("#clear-filters").addEventListener("click", clear);
    $("#empty-clear").addEventListener("click", clear);
    render();
  }

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error("تعذرت قراءة الصورة."));
      reader.readAsDataURL(file);
    });
  }

  function initAddBook() {
    const form = $("#add-book-form");
    if (!form) return;
    const fileInput = $("#book-images");
    const previewArea = $("#image-previews");
    const imageError = $("#images-error");
    const uploadZone = $("#upload-zone");
    let selectedFiles = [];
    let previewVersion = 0;

    const clearError = field => {
      field.classList.remove("invalid");
      const error = field.parentElement.querySelector(".field-error");
      if (error) error.classList.add("hidden");
    };
    const syncFiles = () => {
      const transfer = new DataTransfer();
      selectedFiles.forEach(file => transfer.items.add(file));
      fileInput.files = transfer.files;
    };
    const renderPreviews = async () => {
      const version = ++previewVersion;
      previewArea.innerHTML = "";
      imageError.classList.add("hidden");
      for (let index = 0; index < selectedFiles.length; index += 1) {
        const file = selectedFiles[index];
        const item = document.createElement("div");
        item.className = "preview-item";
        const image = document.createElement("img");
        image.alt = `معاينة الصورة ${index + 1}: ${file.name}`;
        const name = document.createElement("span");
        name.className = "preview-name";
        name.textContent = file.name;
        const remove = document.createElement("button");
        remove.className = "preview-remove";
        remove.type = "button";
        remove.setAttribute("aria-label", `حذف الصورة ${file.name}`);
        remove.textContent = "×";
        remove.addEventListener("click", () => {
          selectedFiles.splice(index, 1);
          syncFiles();
          renderPreviews();
        });
        item.append(image, name, remove);
        previewArea.append(item);
        try {
          const dataURL = await fileToDataURL(file);
          if (version === previewVersion) image.src = dataURL;
        } catch (error) {
          console.error("تعذرت قراءة الصورة:", error);
          showToast(`تعذرت معاينة الصورة: ${file.name}`);
        }
      }
    };

    fileInput.addEventListener("change", () => {
      const incoming = [...fileInput.files];
      const invalid = incoming.filter(file => !file.type.startsWith("image/") || file.size > 8 * 1024 * 1024);
      if (invalid.length) showToast("اختر صوراً صالحة لا يتجاوز حجم كل منها 8 ميجابايت.");
      selectedFiles = [...selectedFiles, ...incoming.filter(file => file.type.startsWith("image/") && file.size <= 8 * 1024 * 1024)];
      syncFiles();
      renderPreviews();
    });
    ["dragenter", "dragover"].forEach(name => uploadZone.addEventListener(name, event => {
      event.preventDefault();
      uploadZone.classList.add("drag-over");
    }));
    ["dragleave", "drop"].forEach(name => uploadZone.addEventListener(name, event => {
      event.preventDefault();
      uploadZone.classList.remove("drag-over");
    }));
    uploadZone.addEventListener("drop", event => {
      const incoming = [...(event.dataTransfer?.files || [])];
      selectedFiles = [...selectedFiles, ...incoming.filter(file => file.type.startsWith("image/") && file.size <= 8 * 1024 * 1024)];
      if (incoming.length !== incoming.filter(file => file.type.startsWith("image/") && file.size <= 8 * 1024 * 1024).length) showToast("تم تجاهل ملفات غير صالحة أو أكبر من 8 ميجابايت.");
      syncFiles();
      renderPreviews();
    });

    const saleRadio = $('input[name="transaction"][value="sale"]');
    const tradeRadio = $('input[name="transaction"][value="trade"]');
    const priceField = $("#price-field");
    const tradeField = $("#trade-field");
    const priceInput = $("#book-price");
    const wantedInput = $("#trade-wanted");
    const updateTransaction = () => {
      const sale = saleRadio.checked;
      priceField.classList.toggle("hidden", !sale);
      tradeField.classList.toggle("hidden", sale);
      priceInput.required = sale;
      wantedInput.required = !sale;
      clearError(priceField);
      clearError(tradeField);
    };
    saleRadio.addEventListener("change", updateTransaction);
    tradeRadio.addEventListener("change", updateTransaction);

    form.addEventListener("input", event => {
      const field = event.target;
      if (field.matches("input, select, textarea")) clearError(field);
    });
    form.addEventListener("change", event => {
      if (event.target.matches("input, select")) clearError(event.target);
    });
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        selectedFiles = [];
        previewArea.innerHTML = "";
        imageError.classList.add("hidden");
        $$(".field-error", form).forEach(error => error.classList.add("hidden"));
        $$(".invalid", form).forEach(field => field.classList.remove("invalid"));
        updateTransaction();
      }, 0);
    });

    form.addEventListener("submit", async event => {
      event.preventDefault();
      let valid = true;
      const setInvalid = (field, message) => {
        valid = false;
        field.classList.add("invalid");
        const error = field.parentElement.querySelector(".field-error");
        if (error) {
          if (message) error.textContent = message;
          error.classList.remove("hidden");
        }
      };
      if (!selectedFiles.length) {
        imageError.classList.remove("hidden");
        valid = false;
      } else imageError.classList.add("hidden");

      ["#book-title", "#book-author", "#book-category", "#book-condition", "#book-city"].forEach(selector => {
        const field = $(selector);
        if (!field.value.trim()) setInvalid(field);
      });
      if (saleRadio.checked && (!priceInput.value || Number(priceInput.value) <= 0)) setInvalid(priceInput);
      if (tradeRadio.checked && !wantedInput.value.trim()) setInvalid(wantedInput);
      const delivery = $$('input[name="delivery"]:checked', form);
      const deliveryGroup = $(".delivery-options");
      const deliveryError = deliveryGroup.parentElement.querySelector(".field-error");
      deliveryError.classList.toggle("hidden", delivery.length > 0);
      if (!delivery.length) valid = false;
      if (!valid) {
        const firstInvalid = $(".invalid", form);
        (firstInvalid || imageError).scrollIntoView({ behavior: "smooth", block: "center" });
        if (firstInvalid) firstInvalid.focus({ preventScroll: true });
        return;
      }

      const submit = $('button[type="submit"]', form);
      submit.disabled = true;
      submit.textContent = "جارٍ تجهيز الإعلان...";
      try {
        const images = await Promise.all(selectedFiles.map(fileToDataURL));
        const book = {
          id: `book-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: $("#book-title").value.trim(),
          author: $("#book-author").value.trim(),
          category: $("#book-category").value,
          condition: $("#book-condition").value,
          notes: $("#book-notes").value.trim(),
          type: saleRadio.checked ? "sale" : "trade",
          ...(saleRadio.checked ? { price: Number(priceInput.value) } : { tradeWanted: wantedInput.value.trim() }),
          city: $("#book-city").value,
          delivery: delivery.map(input => input.value),
          images,
          status: "active",
          seller: getCurrentUser()?.name || "قارئ من المجتمع",
          rating: "قارئ جديد"
        };
        const books = getBooks();
        books.unshift(book);
        if (!saveBooks(books)) return;
        showToast("تم نشر كتابك بنجاح! أصبح الآن متاحاً للقرّاء.");
        window.setTimeout(() => { window.location.href = "my-shelf.html"; }, 1000);
      } catch (error) {
        console.error("تعذر تجهيز إعلان الكتاب:", error);
        showToast("تعذرت قراءة إحدى الصور. أعد اختيار الصور وحاول مرة أخرى.");
      } finally {
        submit.disabled = false;
        submit.innerHTML = 'نشر عرض الكتاب <span aria-hidden="true">←</span>';
      }
    });
    updateTransaction();
  }

  function initTradeCenter() {
    const grid = $("#trade-grid");
    if (!grid) return;
    const books = getBooks().filter(book => book.type === "trade" && book.status !== "completed");
    grid.innerHTML = books.map(book => bookCard(book, true)).join("");
    $("#trade-count").textContent = `${books.length} ${books.length === 1 ? "عرض" : "عروض"}`;
    $("#trade-empty").classList.toggle("hidden", books.length > 0);
    grid.classList.toggle("hidden", books.length === 0);
  }

  function initDetails() {
    const target = $("#book-detail-content");
    if (!target) return;
    const books = getBooks().filter(book => book.status !== "deleted");
    const id = new URLSearchParams(window.location.search).get("id");
    const book = books.find(item => item.id === id) || books[0];
    if (!book) {
      target.innerHTML = '<div class="empty-state"><h2>هذا الكتاب غير متاح حالياً</h2><a class="button button-primary" href="index.html">العودة لتصفح الكتب</a></div>';
      return;
    }
    const images = book.images || [];
    const isTrade = book.type === "trade";
    target.innerHTML = `
      <div class="gallery">
        <div class="gallery-main" id="gallery-main">${images.length ? imageMarkup(book, 0) : `<span class="gallery-placeholder">${escapeHTML(book.title)}</span>`}</div>
        <div class="gallery-thumbs" role="group" aria-label="صور الكتاب">${images.map((image, index) => `<button class="gallery-thumb${index === 0 ? " active" : ""}" type="button" aria-label="عرض الصورة ${index + 1}" data-image-index="${index}"><img src="${escapeHTML(image)}" alt=""></button>`).join("")}</div>
      </div>
      <div class="detail-info">
        <span class="detail-badge">${isTrade ? "⇄ متاح للتبادل" : "للبيع"} · ${escapeHTML(book.category)}</span>
        <h1>${escapeHTML(book.title)}</h1><p class="detail-author">لـ ${escapeHTML(book.author)}</p>
        <p class="detail-price">${isTrade ? "متاح للبدل" : `${escapeHTML(book.price)} ج.م`} <small>${isTrade ? "" : "السعر قابل للنقاش مع البائع"}</small></p>
        <h2>عن الكتاب</h2><p class="detail-description">${escapeHTML(book.notes || "كتابٌ يبحث عن قارئ جديد ليكمل معه الحكاية. لا توجد ملاحظات إضافية من البائع.")}</p>
        ${isTrade ? `<h2>الكتب المقبولة كبديل</h2><p class="detail-description">${escapeHTML(book.tradeWanted || "تواصل مع القارئ لاقتراح التبادل المناسب.")}</p>` : ""}
        <div class="detail-facts"><div class="detail-fact"><span>حالة الكتاب</span><strong>${escapeHTML(book.condition)}</strong></div><div class="detail-fact"><span>التصنيف</span><strong>${escapeHTML(book.category)}</strong></div><div class="detail-fact"><span>التسليم</span><strong>${escapeHTML((book.delivery || []).join("، ") || "يُتفق مع البائع")}</strong></div><div class="detail-fact"><span>المدينة</span><strong>${escapeHTML(book.city || "غير محددة")}</strong></div></div>
        <div class="seller-card"><span class="seller-avatar">${escapeHTML((book.seller || "ق").trim().charAt(0))}</span><div><span class="seller-name">${escapeHTML(book.seller || "قارئ من المجتمع")}</span><span class="seller-rating">★ ${escapeHTML(book.rating || "قارئ جديد")}</span></div><span class="seller-location">⌖ ${escapeHTML(book.city || "")}</span></div>
        <div class="detail-actions"><button class="button button-primary" type="button" data-action="${isTrade ? "trade" : "buy"}">${isTrade ? "⇄ اطلب التبادل" : "♡ أبدِ اهتمامك بالشراء"}</button><a class="button button-outline" href="my-shelf.html">رفوفي</a></div>
      </div>`;
    $$(".gallery-thumb", target).forEach(button => button.addEventListener("click", () => {
      const index = Number(button.dataset.imageIndex);
      const main = $("#gallery-main");
      const image = images[index];
      main.innerHTML = `<img class="book-cover" src="${escapeHTML(image)}" alt="صورة ${index + 1} من كتاب ${escapeHTML(book.title)}">`;
      $$(".gallery-thumb", target).forEach(thumb => thumb.classList.toggle("active", thumb === button));
    }));
    const action = $('[data-action]', target);
    action?.addEventListener("click", () => {
      const dialog = $("#action-dialog");
      if (!dialog) return;
      $("#dialog-title").textContent = isTrade ? "اطلب التبادل" : "تواصل مع البائع";
      $("#dialog-message").textContent = isTrade ? `أرسل اقتراحك للتبادل بكتاب «${book.title}».` : `أرسل اهتمامك بكتاب «${book.title}» إلى ${book.seller || "البائع"}.`;
      $("#buyer-message").value = "";
      dialog.showModal();
    });
    $("#dialog-send")?.addEventListener("click", () => {
      const request = {
        id: `request-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        bookId: book.id,
        title: book.title,
        seller: book.seller || "قارئ من المجتمع",
        type: isTrade ? "طلب تبادل" : "اهتمام بالشراء",
        message: $("#buyer-message").value.trim(),
        status: "بانتظار الرد",
        createdAt: new Date().toLocaleDateString("ar-EG")
      };
      const requests = getRequests();
      requests.unshift(request);
      if (!saveRequests(requests)) return;
      $("#action-dialog").close();
      showToast("تم حفظ طلبك في رفوفك. تابع الرد من صفحة رفوفي.");
    });
  }

  function initShelf() {
    const tableBody = $("#shelf-book-list");
    if (!tableBody) return;
    const filter = $("#shelf-filter");
    let books = getBooks().filter(book => !book.id.startsWith("seed-"));
    let requests = getRequests();
    const stats = () => {
      $("#stat-total").textContent = String(books.length).replace(/\d/g, digit => "٠١٢٣٤٥٦٧٨٩"[digit]);
      $("#stat-active").textContent = String(books.filter(book => book.status === "active").length).replace(/\d/g, digit => "٠١٢٣٤٥٦٧٨٩"[digit]);
      $("#stat-completed").textContent = String(books.filter(book => book.status === "completed").length).replace(/\d/g, digit => "٠١٢٣٤٥٦٧٨٩"[digit]);
    };
    const render = () => {
      const visible = books.filter(book => !filter.value || (filter.value === "active" ? book.status === "active" : book.status === "completed"));
      const rows = visible.map(book => {
        const completed = book.status === "completed";
        const label = book.type === "trade" ? escapeHTML(book.tradeWanted || "تبادل") : `${escapeHTML(book.price)} ج.م`;
        const cover = book.images?.[0] ? `<img src="${escapeHTML(book.images[0])}" alt="">` : `<span class="cover-placeholder">${escapeHTML(book.title)}</span>`;
        const info = `<div class="shelf-book-cell"><span class="shelf-thumb">${cover}</span><span><strong>${escapeHTML(book.title)}</strong><small>${escapeHTML(book.author)}</small></span></div>`;
        const actions = `<div class="row-actions">${completed ? `<button class="small-action" data-action="reactivate" data-id="${escapeHTML(book.id)}">إعادة النشر</button>` : `<button class="small-action" data-action="edit" data-id="${escapeHTML(book.id)}">${book.type === "sale" ? "تعديل السعر" : "تعديل العرض"}</button><button class="small-action" data-action="complete" data-id="${escapeHTML(book.id)}">تمت المعاملة</button>`}<button class="small-action delete" data-action="delete" data-id="${escapeHTML(book.id)}">حذف</button></div>`;
        return `<tr><td>${info}</td><td>${book.type === "trade" ? "تبادل" : "بيع"}</td><td>${label}</td><td><span class="status-pill${completed ? " completed" : ""}">${completed ? (book.type === "trade" ? "تم التبادل" : "تم البيع") : "نشط"}</span></td><td>${actions}</td></tr>`;
      }).join("");
      tableBody.innerHTML = rows;
      $("#shelf-book-cards").innerHTML = visible.map(book => {
        const completed = book.status === "completed";
        const cover = book.images?.[0] ? `<img src="${escapeHTML(book.images[0])}" alt="">` : `<span class="cover-placeholder">${escapeHTML(book.title)}</span>`;
        const actionButtons = completed ? `<button class="small-action" data-action="reactivate" data-id="${escapeHTML(book.id)}">إعادة النشر</button>` : `<button class="small-action" data-action="edit" data-id="${escapeHTML(book.id)}">تعديل السعر</button><button class="small-action" data-action="complete" data-id="${escapeHTML(book.id)}">تمت المعاملة</button>`;
        return `<article class="shelf-card"><div class="shelf-book-cell"><span class="shelf-thumb">${cover}</span><span><strong>${escapeHTML(book.title)}</strong><small>${escapeHTML(book.author)}</small></span></div><div class="shelf-card-meta"><span>${book.type === "trade" ? "تبادل" : `${escapeHTML(book.price)} ج.م`}</span><span class="status-pill${completed ? " completed" : ""}">${completed ? (book.type === "trade" ? "تم التبادل" : "تم البيع") : "نشط"}</span></div><div class="shelf-card-actions">${actionButtons}<button class="small-action delete" data-action="delete" data-id="${escapeHTML(book.id)}">حذف</button></div></article>`;
      }).join("");
      const isEmpty = visible.length === 0;
      $(".shelf-table-wrap").classList.toggle("hidden", isEmpty);
      $("#shelf-book-cards").classList.toggle("hidden", isEmpty);
      $("#shelf-empty").classList.toggle("hidden", !isEmpty || (books.length > 0 && filter.value !== ""));
      stats();
      $("#requests-list").innerHTML = requests.map(request => `<article class="request-card"><div><strong>${escapeHTML(request.type)} · ${escapeHTML(request.title)}</strong><small>إلى ${escapeHTML(request.seller)}${request.createdAt ? ` · ${escapeHTML(request.createdAt)}` : ""}${request.message ? ` · «${escapeHTML(request.message)}»` : ""}</small></div><div><span class="status-pill">${escapeHTML(request.status || "بانتظار الرد")}</span><button class="request-cancel" type="button" data-request-id="${escapeHTML(request.id)}">إلغاء الطلب</button></div></article>`).join("");
      $("#requests-empty").classList.toggle("hidden", requests.length > 0);
    };
    const handleAction = event => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const item = books.find(book => book.id === button.dataset.id);
      if (!item) return;
      switch (button.dataset.action) {
        case "edit": {
          if (item.type !== "sale") {
            const wanted = window.prompt("ما الكتب التي تقبلها كبديل؟", item.tradeWanted || "");
            if (wanted === null) return;
            if (!wanted.trim()) {
              showToast("أدخل نوع الكتب التي تقبلها كبديل.");
              return;
            }
            item.tradeWanted = wanted.trim();
            break;
          }
          const price = window.prompt("أدخل السعر الجديد بالجنيه المصري:", item.price);
          if (price === null) return;
          if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
            showToast("أدخل سعراً صحيحاً أكبر من صفر.");
            return;
          }
          item.price = Number(price);
          break;
        }
        case "complete":
          item.status = "completed";
          break;
        case "reactivate":
          item.status = "active";
          break;
        case "delete":
          if (!window.confirm(`هل تريد حذف إعلان «${item.title}» نهائياً؟`)) return;
          books = books.filter(book => book.id !== item.id);
          break;
        default:
          return;
      }
      const allBooks = getBooks().filter(book => book.id.startsWith("seed-"));
      if (saveBooks([...allBooks, ...books])) {
        showToast("تم تحديث رفّك.");
        render();
      }
    };
    tableBody.addEventListener("click", handleAction);
    $("#shelf-book-cards").addEventListener("click", handleAction);
    $("#requests-list").addEventListener("click", event => {
      const button = event.target.closest("[data-request-id]");
      if (!button) return;
      if (!window.confirm("هل تريد إلغاء هذا الطلب؟")) return;
      requests = requests.filter(request => request.id !== button.dataset.requestId);
      if (saveRequests(requests)) {
        showToast("تم إلغاء الطلب.");
        render();
      }
    });
    filter.addEventListener("change", render);
    render();
  }

  initTheme();
  initNavigation();
  initAuth();
  initHome();
  initAddBook();
  initTradeCenter();
  initDetails();
  initShelf();
})();
