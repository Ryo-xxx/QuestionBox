        const textList = document.getElementById('textList');

        // スクロール時にスクロールバーを表示
        textList.addEventListener('scroll', () => {
            if (textList.scrollTop > 0) {
                textList.classList.remove('hidden');
            } else {
                textList.classList.add('hidden');
            }
        });

        // スクロール終了後にスクロールバーを非表示
        let timeout;
        textList.addEventListener('scroll', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (textList.scrollTop === 0) {
                    textList.classList.add('hidden');
                }
            }, 500); // スクロール終了後500msで非表示にする
        });

        // 初期状態でスクロールバーを非表示にする
        textList.classList.add('hidden');

        let scale = 1; // 初期スケールの設定

        // ページ全体のスケールを変更する関数
        function setScale(scaleValue) {
            document.body.style.transformOrigin = 'top left'; // 拡大縮小の基準を左上に設定
            document.body.style.transform = `scale(${scaleValue})`;
        }

        window.addEventListener('wheel', function(e) {
            // Ctrlキーが押されている場合のみ動作
            if (e.ctrlKey) {
                e.preventDefault(); // デフォルトのズームを防ぐ

                // マウススクロールの方向を確認
                if (e.deltaY < 0) {
                    // スクロールアップ（拡大）
                    scale += 0.1;
                } else {
                    // スクロールダウン（縮小）
                    scale -= 0.1;
                }

                // スケール値が最小0.5倍、最大2倍を超えないように制限
                scale = Math.min(Math.max(scale, 0.5), 2);

                // ページのスケールを更新
                setScale(scale);
            }
        });
        // ページ読み込み時にローカルストレージから時計の色を取得して適用
        window.addEventListener('load', () => {
            const savedClockColor = localStorage.getItem('clockColor');

            if (savedClockColor) {
                // もし保存された時計の色があれば、それを適用
                document.documentElement.style.setProperty('--clock-color', savedClockColor);
                document.documentElement.style.setProperty('--text-shadow-color', savedClockColor);
                document.documentElement.style.setProperty('--glow-color', savedClockColor);
            }
        });
        // 時計のHTML要素を取得
        const changeClockColorButton = document.getElementById('changeClockColor');
        const clockColorPicker = document.getElementById('clockColorPicker');
        const clockElement = document.querySelector('.clock');
        const dateElement = document.querySelector('.clock-date');
        const glowColorInput = document.getElementById('glowColor');
        const clockColorInput = document.getElementById('clockColor');
        // 初期化
        window.addEventListener('load', () => {
            updateClock(); // 初回実行
            setInterval(updateClock, 1000); // 毎秒更新
        });
        // 色ピッカーで色が変更されたときに時計の色を変更
        clockColorPicker.addEventListener('input', (event) => {
            // 色を取得
            const selectedColor = event.target.value;
            // 時計の色を変更
            document.documentElement.style.setProperty('--clock-color', selectedColor);
            // text-shadow の色も変更
            document.documentElement.style.setProperty('--glow-color', selectedColor);
        });

        // 時計の更新関数
        function updateClock() {
            // 時間をフォーマット
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            // 前面の動く時計に現在時刻を設定
            const dynamicClock = document.getElementById('clock');
            dynamicClock.textContent = `${hours}:${minutes}:${seconds}`;
            // 日付をフォーマット
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const dateElement = document.getElementById('dateElement');
            // 日付と曜日をフォーマット
            const day = days[now.getDay()];
            const month = months[now.getMonth()];
            const date = now.getDate();
            const year = now.getFullYear();
            dateElement.innerHTML = `<span class="day">${day}</span>, <span class="date">${month}</span>, ${date} ${year}`;
        }
        // ページ読み込み時にローカルストレージから時計の色を取得して適用
        window.addEventListener('load', () => {
            const savedClockColor = localStorage.getItem('clockColor');
            const savedGlowColor = localStorage.getItem('glowColor');

            if (savedClockColor) {
                document.documentElement.style.setProperty('--clock-color', savedClockColor);
                document.documentElement.style.setProperty('--text-shadow-color', savedClockColor);
            }
            if (savedGlowColor) {
                document.documentElement.style.setProperty('--glow-color', savedGlowColor);
            }
        });
        // 毎秒更新
        setInterval(updateClock, 1000);
        // 初回更新
        updateClock();
        // 時計の色変更ボタンがクリックされたときに色ピッカーを表示
        changeClockColorButton.addEventListener('click', () => {
            clockColorPicker.click();  // 色ピッカーをプログラム的にクリックして表示
        });
        // 色ピッカーで色が変更されたときに時計の色を変更
        clockColorPicker.addEventListener('input', (event) => {
            const selectedColor = event.target.value;
            document.documentElement.style.setProperty('--clock-color', selectedColor);
            document.documentElement.style.setProperty('--text-shadow-color', selectedColor);
            localStorage.setItem('clockColor', selectedColor); // 保存
        });

        glowColorInput.addEventListener('input', (event) => {
            const selectedGlowColor = event.target.value;
            document.documentElement.style.setProperty('--glow-color', selectedGlowColor);
            localStorage.setItem('glowColor', selectedGlowColor); // 保存
        });
        // 更新関連
        const elements = {
            loadFileBtn: document.getElementById('loadFileBtn'),
            fileInput: document.getElementById('fileInput'),
            textList: document.getElementById('textList'),
            overlayText: document.getElementById('overlayText'),
            fontSelect: document.getElementById('fontFamily'),
            fontSizeControl: document.getElementById('fontSize'),
            fontSizeValue: document.getElementById('fontSizeValue'),
            decreaseFontSizeBtn: document.getElementById('decreaseFontSize'),
            increaseFontSizeBtn: document.getElementById('increaseFontSize')
        };

        let currentFontSize = parseInt(elements.fontSizeValue.textContent);
        elements.loadFileBtn.addEventListener('click', () => elements.fileInput.click());
        elements.fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => displayTextList(e.target.result);
                reader.readAsText(file);
            }
        });
        // 初期化時のCSSスタイルを設定
        elements.overlayText.style.opacity = '0';
        elements.overlayText.style.transition = 'opacity 0.5s ease-in-out';
        elements.overlayText.style.visibility = 'hidden';

        // フォント変更イベント (overlayTextにのみ適用)
        elements.fontSelect.addEventListener('change', (event) => {
            const selectedFont = event.target.value;

            // テキストを透明にしてフェードアウト
            elements.overlayText.style.opacity = '0';
            setTimeout(() => {
                // フェードアウト完了後にフォント変更
                elements.overlayText.style.fontFamily = selectedFont;

                // フェードイン
                elements.overlayText.style.visibility = 'visible';
                elements.overlayText.style.opacity = '1';
            }, 450); // フェードアウト時間と合わせる
        });

        // ドロップダウン外をクリックした場合にメニューを閉じる
        window.addEventListener('click', (event) => {
            if (!event.target.matches('#fontSelect')) {
                document.getElementById('fontDropdown').style.display = 'none';
            }
        });

        // フォント変更関数 (手動でフォント変更時に使用)
        function changeFont(font) {
            elements.overlayText.style.opacity = '0';
            setTimeout(() => {
                elements.overlayText.style.fontFamily = font;
                elements.overlayText.style.opacity = '1';
            }, 450); // フェードアウト時間と合わせる
            document.getElementById('fontDropdown').style.display = 'none';
        }

        // フォントサイズ変更イベント (スライダーとボタンの両方)
        elements.fontSizeControl.addEventListener('input', (event) => {
            currentFontSize = event.target.value;
            elements.fontSizeValue.textContent = `${currentFontSize}px`;
            elements.overlayText.style.fontSize = `${currentFontSize}px`; // #overlayTextのフォントサイズを変更
        });

        elements.decreaseFontSizeBtn.addEventListener('click', () => {
            if (currentFontSize > 8) {
                currentFontSize--;
                elements.fontSizeValue.textContent = `${currentFontSize}px`;
                elements.overlayText.style.fontSize = `${currentFontSize}px`;
                elements.fontSizeControl.value = currentFontSize;
            }
        });

        elements.increaseFontSizeBtn.addEventListener('click', () => {
            if (currentFontSize < 48) {
                currentFontSize++;
                elements.fontSizeValue.textContent = `${currentFontSize}px`;
                elements.overlayText.style.fontSize = `${currentFontSize}px`;
                elements.fontSizeControl.value = currentFontSize;
            }
        });

        let selectedTextIndex = 0; // 最初に表示するテキストのインデックスを 0 に設定

        // 矢印ボタンのイベントリスナー
        document.querySelector('.prev-button').addEventListener('click', () => {
            if (elements.textList.children.length > 0) {
                // 前の項目を選択
                selectedTextIndex = (selectedTextIndex - 1 + elements.textList.children.length) % elements.textList.children.length; // ループ処理
                handleTextClick(elements.textList.children[selectedTextIndex].textContent, elements.textList.children[selectedTextIndex]);
            }
        });

        document.querySelector('.next-button').addEventListener('click', () => {
            if (elements.textList.children.length > 0) {
                // 次の項目を選択
                selectedTextIndex = (selectedTextIndex + 1) % elements.textList.children.length; // ループ処理
                handleTextClick(elements.textList.children[selectedTextIndex].textContent, elements.textList.children[selectedTextIndex]);
            }
        });

        // テキスト項目をクリックしたときに選択状態を更新
        function handleTextClick(text, element) {
            const index = Array.from(elements.textList.children).indexOf(element);
            selectedTextIndex = index; // 最新の選択インデックスを保存

            // 他の要素のハイライトを消す
            clearHighlights();

            // 新たに選択した要素にハイライトを追加
            element.classList.add('highlight');

            /// 番号を削除したテキストをoverlayTextに表示
            const textWithoutNumber = text.replace(/^\d+\./, '').trim();  // 番号を削除
            displayOverlayText(textWithoutNumber);  // 番号を削除したテキストを表示
            resizeTextToFit(elements.overlayText);  // サイズ調整を再度呼び出し
        }

        // 他の要素のハイライトを消す関数
        function clearHighlights() {
            Array.from(elements.textList.children).forEach((item) => {
                item.classList.remove('highlight');
            });
        }

        // overlayTextに表示されるテキストを更新する
        function displayOverlayTextWithFade(text) {
            const overlayText = elements.overlayText;

            // テキストを一旦透明にして更新
            overlayText.style.opacity = '0';
            overlayText.textContent = text;

            // フェードインアニメーション
            overlayText.style.transition = 'opacity 0.5s ease-in-out'; // アニメーション設定
            overlayText.style.visibility = 'visible'; // 表示する
            setTimeout(() => {
                overlayText.style.opacity = '1'; // 不透明にしてフェードイン
            }, 0); // タイミング調整
        }

        // overlayTextに対応するtextList項目をハイライトする
        function highlightOverlayTextItem(text) {
            const items = Array.from(elements.textList.children);
            items.forEach((item, index) => {
                // テキストが一致した場合、その項目をハイライト
                if (item.textContent.trim() === text.trim()) {
                    selectedTextIndex = index; // 一致した項目のインデックスを更新
                    item.classList.add('highlight'); // ハイライトを追加
                }
            });
        }

    // resizeTextToFit関数でテキストのサイズを調整
    function resizeTextToFit(element) {
        // 要素のスタイルを取得
        const styles = window.getComputedStyle(element);
        const maxWidth = parseInt(styles.maxWidth, 10);
        const maxHeight = parseInt(styles.maxHeight, 10);

        if (isNaN(maxWidth) || isNaN(maxHeight)) {
            console.error('Failed to retrieve maxWidth or maxHeight. Check the element styles.');
            return;
        }

        let fontSize = 24; // 初期フォントサイズ

        // テキスト内容を取得し、改行で分割
        const lines = element.textContent.trim().split('\n'); // textContentで余計なタグの影響を回避

        console.log('Lines:', lines); // デバッグ用：行の内容を確認

        // 各行の文字数が27文字以下か確認
        const allLinesWithinLimit = lines.every(line => line.length <= 27);
        console.log('All lines within 27 characters:', allLinesWithinLimit); // デバッグ用

        if (allLinesWithinLimit) {
            // 全ての行が27文字以下の場合、フォントサイズを24pxに固定
            fontSize = 24;
            element.style.fontSize = `${fontSize}px`;
            console.log('Font size set to 24px as all lines are within 27 characters.');
            return;
        }

        // 初期フォントサイズを設定
        element.style.fontSize = `${fontSize}px`;

        // 要素が指定サイズ内に収まるようにフォントサイズを調整
        while ((element.scrollWidth > maxWidth || element.scrollHeight > maxHeight) && fontSize > 8) {
            fontSize--; // フォントサイズを1pxずつ減少
            element.style.fontSize = `${fontSize}px`;
            console.log(`Reducing font size: ${fontSize}px`); // デバッグ用
        }

        // フォントサイズが最小値以下になる場合の警告
        if (fontSize <= 8) {
            console.warn('Text is too large to fit within the container.');
        } else {
            console.log('Adjusted font size to fit:', fontSize);
        }
    }

        // リストの表示関数
        function displayTextList(content) {
            const parts = content.split(/\n{3}\/{3}\n{3}/).filter(part => part.trim());
            elements.textList.innerHTML = ''; // 既存のテキストリストをクリア

            parts.forEach((text, index) => {
                const div = document.createElement('div');
                div.className = 'text-item';

                const numberSpan = document.createElement('span');
                numberSpan.className = 'number';
                numberSpan.textContent = (index + 1) + '.'; // 番号を表示

                const textSpan = document.createElement('span');
                textSpan.textContent = text; // 番号を含むテキストを表示

                div.appendChild(numberSpan);
                div.appendChild(textSpan); // 番号を含むテキストを表示

                // クリック時に背景色をピンクに変更
                div.addEventListener('click', () => {
                    handleTextClick(text, div); // 番号を含むテキストをクリック
                });

                elements.textList.appendChild(div);
            });

            // 最初のテキストを自動的に選択
            if (elements.textList.children.length > 0) {
                // 番号を削除したテキストをoverlayTextに表示
                handleTextClick(
                    parts[selectedTextIndex].replace(/^\d+\./, '').trim(),
                    elements.textList.children[selectedTextIndex]
                );
            }
        }

        // overlayTextに番号を表示しないようにする
        function displayOverlayText(text) {
            // 先頭の番号を削除（overlayTextには番号が表示されないようにする）
            const textWithoutNumber = text.replace(/^\d+\./, '').trim(); // 番号を削除

            elements.overlayText.textContent = textWithoutNumber;
            elements.overlayText.style.visibility = 'visible';
            setTimeout(() => {
                elements.overlayText.style.opacity = 1;
            }, 10);

            // 改行を含む場合の行数を計算する
            let lines = elements.overlayText.innerText.split('\n');

            // 各行が27文字以下なら中央揃えにする
            let allLinesShort = lines.every(line => line.length <= 27);

            if (allLinesShort) {
                elements.overlayText.style.textAlign = 'center'; // 中央揃え
                elements.overlayText.style.justifyContent = 'center'; // フレックスコンテナの中央揃え
            } else {
                elements.overlayText.style.textAlign = 'left'; // 左揃え
                elements.overlayText.style.justifyContent = 'start'; // 左揃え
            }

            resizeTextToFit(elements.overlayText);
        }

        function resizeTextToFit(element) {
            const styles = window.getComputedStyle(element);
            const maxWidth = parseInt(styles.maxWidth, 10);
            const maxHeight = parseInt(styles.maxHeight, 10);
            let fontSize = 24;

            element.style.fontSize = `${fontSize}px`;

            // ループで最適なフォントサイズを見つける
            while ((element.scrollWidth > maxWidth || element.scrollHeight > maxHeight) && fontSize > 8) {
                fontSize--;
                element.style.fontSize = `${fontSize}px`;
            }

            if (fontSize <= 8) {
                console.warn('Text is too large to fit within the container.');
            }
        }

        // ボタン要素を取得
        const changeBackgroundColorBtn = document.getElementById('changeBackgroundColor');
        const backgroundColorPicker = document.getElementById('backgroundColorPicker');
        const changeTextColorBtn = document.getElementById('changeTextColor');
        const textColorPicker = document.getElementById('textColorPicker');
        const changeBorderColorBtn = document.getElementById('changeBorderColor');
        const borderColorPicker = document.getElementById('borderColorPicker');
        const changeOverlayTextColorBtn = document.getElementById('changeOverlayTextColor');
        const overlayTextColorPicker = document.getElementById('overlayTextColorPicker');
        // ページ読み込み時に保存された色を適用
        document.addEventListener('DOMContentLoaded', () => {
        const savedBackgroundColor = localStorage.getItem('backgroundColor');
        const savedTextColor = localStorage.getItem('textColor');
        const savedBorderColor = localStorage.getItem('borderColor');
        const savedOverlayTextColor = localStorage.getItem('overlayTextColor');

            if (savedBackgroundColor) {
                document.body.style.backgroundColor = savedBackgroundColor;
                backgroundColorPicker.value = savedBackgroundColor; // カラーピッカーの値を更新
            }

            if (savedTextColor) {
                document.body.style.color = savedTextColor;
                textColorPicker.value = savedTextColor; // カラーピッカーの値を更新
            }

            if (savedBorderColor) {
                document.querySelectorAll('.font-button, #colorControl button').forEach(button => {
                    button.style.borderColor = savedBorderColor;
            });

            borderColorPicker.value = savedBorderColor; // カラーピッカーの値を更新
            }

            if (savedOverlayTextColor) {
                overlayTextColorPicker.value = savedOverlayTextColor;
                document.getElementById('overlayText').style.color = savedOverlayTextColor;
            }
        });

        // ボタンの位置を動的に変更する関数
        function changeButtonPosition(buttonId, topPosition, leftPosition) {
            const button = document.getElementById(buttonId);
            button.style.top = topPosition + 'px';
            button.style.left = leftPosition + 'px';
        }
        // 背景色変更ボタンのクリックイベント
        changeBackgroundColorBtn.addEventListener('click', () => {
            backgroundColorPicker.click(); // カラーパレットを開く
        });

        // 背景色変更のカラーパレット変更イベント
        backgroundColorPicker.addEventListener('input', (event) => {
            const newColor = event.target.value;
            document.body.style.backgroundColor = newColor; // 背景色を変更
            localStorage.setItem('backgroundColor', newColor); // LocalStorage に保存
        });
        // 文字色変更ボタンのクリックイベント
        changeTextColorBtn.addEventListener('click', () => {
            textColorPicker.click(); // カラーパレットを開く
        });
        // 文字色変更のカラーパレット変更イベント
        textColorPicker.addEventListener('input', (event) => {
            const newColor = event.target.value;
            document.body.style.color = newColor; // 文字色を変更
            localStorage.setItem('textColor', newColor); // LocalStorage に保存
        });
        // ボーダーカラー変更ボタンのクリックイベント
        changeBorderColorBtn.addEventListener('click', () => {
            borderColorPicker.click(); // カラーパレットを開く
        });
        // ボーダーカラー変更のカラーパレット変更イベント
        borderColorPicker.addEventListener('input', (event) => {
            const newColor = event.target.value;
            document.querySelectorAll('.font-button, #colorControl button').forEach(button => {
                button.style.borderColor = newColor; // ボーダーカラーを変更
            });
            localStorage.setItem('borderColor', newColor); // LocalStorage に保存
        });
        // テキストカラー変更ボタンのクリックイベント
        changeOverlayTextColorBtn.addEventListener('click', () => {
            overlayTextColorPicker.click(); // カラーパレットを開く
        });
        // テキストカラー変更のカラーパレット変更イベント
        overlayTextColorPicker.addEventListener('input', (event) => {
            const newColor = event.target.value; // 選択された色を取得
            const overlayTextElement = document.getElementById('overlayText'); // #overlayText を取得
            overlayTextElement.style.color = newColor; // テキストカラーを変更
        });