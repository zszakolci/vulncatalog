INSERT INTO version (id) VALUES
('6.2.X EE'),
('7.0.X'),
('7.1.X'),
('7.2.X'),
('7.3.X'),
('master');

INSERT INTO vulnerability (id, url, description) VALUES
('CVE-2021-30468', 'https://nvd.nist.gov/vuln/detail/CVE-2021-30468', ''),
('CVE-2021-33813', 'https://nvd.nist.gov/vuln/detail/CVE-2021-33813', '');

INSERT INTO ticket (id, ticketId, lpeId, lsvId, vulnerabilityId, libraryId, affectedVersion, fixedVersion) VALUES
(1, 'LPS-135892', 'LPE-17346', 'LSV-908', 'CVE-2021-30468', null, '7.3.X', '7.3.X'),
(2, 'LPS-135892', 'LPE-17346', 'LSV-908', 'CVE-2021-30468', null, 'master', 'master'),
(3, 'LPS-166489', 'LPE-17670', null, 'CVE-2021-30468', null, '7.2.X', '7.2.X'),
(4, 'LPS-166489', 'LPE-17670', null, 'CVE-2021-30468', null, '7.1.X', '7.1.X'),
(5, 'LPS-166489', 'LPE-17670', null, 'CVE-2021-30468', null, '7.0.X', null),
(6, 'LPS-166489', 'LPE-17670', null, 'CVE-2021-30468', null, '6.2.X EE', null),
(7, 'LPS-137136', 'LPE-17362', 'LSV-923', 'CVE-2021-33813', null, 'master', 'master'),
(8, 'LPS-168194', 'LPE-17669', null, 'CVE-2021-33813', null, '7.3.X', '7.3.X'),
(9, 'LPS-168194', 'LPE-17669', null, 'CVE-2021-33813', null, '7.2.X', '7.2.X'),
(10, 'LPS-168194', 'LPE-17669', null, 'CVE-2021-33813', null, '7.1.X', '7.1.X'),
(11, 'LPS-168194', 'LPE-17669', null, 'CVE-2021-33813', null, '7.0.X', null);