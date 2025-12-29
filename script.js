let selectedPackage = null;
let selectedEdition = null;
let selectedRegion = null;
let selectedPrice = 0;

function selectPackage(packageName, price, button) {
    // إزالة التحديد السابق
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });

    document.querySelectorAll('.select-button').forEach(btn => {
        btn.classList.remove('selected');
        btn.innerText = 'اختيار هذه الباقة';
    });

    // تحديد الباقة الحالية
    const card = button.closest('.package-card');
    card.classList.add('selected');
    button.classList.add('selected');
    button.innerText = '✓ تم الاختيار';

    selectedPackage = packageName;
    selectedPrice = price;

    // إظهار الخيارات
    const options = document.getElementById('optionsContainer');
    options.style.display = 'block';
    setTimeout(() => options.classList.add('visible'), 50);

    updateSummary();
}

function selectEdition(edition) {
    document.querySelectorAll('.option-section:first-of-type .option-item')
        .forEach(el => el.classList.remove('selected'));

    event.currentTarget.classList.add('selected');
    selectedEdition = edition;

    updateSummary();
    checkOrderReady();
}

function selectRegion(region) {
    document.querySelectorAll('.option-section:last-of-type .option-item')
        .forEach(el => el.classList.remove('selected'));

    event.currentTarget.classList.add('selected');
    selectedRegion = region;

    updateSummary();
    checkOrderReady();
}

function updateSummary() {
    if (!selectedPackage) return;

    document.getElementById('summaryBox').classList.add('visible');

    document.getElementById('summaryPackage').innerText = selectedPackage;
    document.getElementById('summaryEdition').innerText = selectedEdition ?? '-';
    document.getElementById('summaryRegion').innerText = selectedRegion ?? '-';
    document.getElementById('summaryPrice').innerText =
        selectedPrice ? `$${selectedPrice}` : '-';
}

function checkOrderReady() {
    if (selectedPackage && selectedEdition && selectedRegion) {
        document.getElementById('orderButton').classList.add('active');
    }
}

function submitOrder() {
    alert(
        `تم إرسال الطلب ✅\n\n` +
        `الباقة: ${selectedPackage}\n` +
        `النوع: ${selectedEdition}\n` +
        `المنطقة: ${selectedRegion}\n` +
        `السعر: $${selectedPrice}`
    );
}
