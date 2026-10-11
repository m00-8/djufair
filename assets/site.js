// Existing page behaviour retained. No placeholder links were filled.

            const CONFIG = {
                registrationUrl: '',
                // 확정된 https 사전신청 주소
                ebookUrl: '',
                // 확정된 https 통합 E-Book 주소
                departments: [] // 실제 참여 학과만 입력: {name:'',intro:'',url:'https://...'}
            };
            const $ = s => document.querySelector(s);
            const isHttps = u => {
                try {
                    return new URL(u).protocol === 'https:'
                } catch (e) {
                    return false
                }
            }
            ;
            function go(url, title, msg) {
                if (isHttps(url))
                    return window.open(url, '_blank', 'noopener');
                $('#dt').textContent = title;
                $('#dm').textContent = msg;
                $('#dlg').showModal();
            }
            const D = CONFIG.departments;
            $('#sample').hidden = true;
            D.forEach(d => {
                const c = $('#tp').content.cloneNode(true);
                if (d.name)
                    c.querySelector('h3').textContent = d.name;
                if (d.intro)
                    c.querySelector('p').textContent = d.intro;
                c.querySelector('button').onclick = () => go(d.url, '학과 소개 준비 중', '학과별 E-Book 또는 SNS 주소가 등록되면 연결됩니다.');
                $('#depts').append(c);
            }
            );
            $('#reg').onclick = () => go(CONFIG.registrationUrl, '사전신청 준비 중', '실제 신청 링크는 확정 후 안내됩니다. 현재 신청을 받고 있지 않습니다.');
            $('#ebook').onclick = () => go(CONFIG.ebookUrl, '통합 E-Book 준비 중', '통합 E-Book 주소가 등록되면 연결됩니다.');
            $('#p1').innerHTML = '<div class="band">10.27.(화) 전야제 · 시간·장소 확정 후 안내</div><p>전공설계 특강과 참여 프로그램으로 본행사 전날 전공 탐색을 먼저 시작합니다. 세부 내용은 확정 후 안내합니다.</p>';
            $('#p2').innerHTML = '<div class="band">상시 운영 10:00–16:00 · 프로그램 운영(상담/체험/미션) (점심시간 포함)</div><h2 class="tt148">10.28.(수) 본행사 시간표</h2><ol class="tl148" role="list"><li><span>10:00</span><strong>접수 등록</strong></li><li><span>10:00–16:00</span><strong>프로그램 운영(상담/체험/미션)</strong></li><li><span>11:30–12:00</span><strong>공식 기념행사</strong></li><li><span>16:00</span><strong>본행사 종료</strong></li></ol>';
            const tabs = [...document.querySelectorAll('[role=tab]')];
            const sel = t => tabs.forEach(x => {
                const on = x === t;
                x.setAttribute('aria-selected', on);
                x.tabIndex = on ? 0 : -1;
                $('#' + x.getAttribute('aria-controls')).hidden = !on
            }
            );
            tabs.forEach( (t, i) => {
                t.onclick = () => sel(t);
                t.onkeydown = e => {
                    const k = {
                        ArrowRight: 1,
                        ArrowLeft: -1
                    }[e.key];
                    if (k) {
                        const n = tabs[(i + k + tabs.length) % tabs.length];
                        sel(n);
                        n.focus()
                    }
                }
                ;
            }
            );
            sel(tabs[1]);
            const R = {
                home: '행사 안내',
                departments: '참여 학과',
                schedule: '일정표',
                register: '참가 신청'
            };
            function route(e) {
                let r = location.hash.slice(1);
                if (!Object.hasOwn(R, r))
                    r = 'home';
                $('#hero').hidden = r !== 'home';
                document.querySelectorAll('main>section').forEach(s => s.hidden = s.dataset.r !== r);
                document.querySelectorAll('nav a').forEach(a => a.hash === '#' + r ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
                document.title = R[r] + ' | 2026학년도 대전대학교 전공탐색 박람회';
                if (e) {
                    scrollTo(0, 0);
                    $('main').focus({
                        preventScroll: true
                    })
                }
            }
            addEventListener('hashchange', route);
            route();
        

            document.querySelectorAll('[data-booth-filter]').forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.dataset.boothFilter;
                    document.querySelectorAll('[data-booth-filter]').forEach(b => {
                        b.setAttribute('aria-pressed', String(b === button));
                        b.classList.toggle('gh', b !== button)
                    }
                    );
                    document.querySelectorAll('.booth-group88').forEach(g => {
                        g.hidden = filter !== '전체' && g.querySelector('.booth88').dataset.kind !== filter
                    }
                    )
                }
                )
            }
            );
        