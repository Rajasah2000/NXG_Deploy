import React from 'react'
import { Link } from 'react-router-dom'

const SidebarCopy = () => {
    return (
        <>
            <aside id="sidebar" class="sidebar">

                <ul class="sidebar-nav" id="sidebar-nav">

                    <li class="nav-item">
                        <Link class="nav-link " to="/">
                            <i class="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#country-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Country</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="country-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/manage/country">
                                    <i class="bi bi-circle"></i><span>Manage</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#leauge-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Team Leauge</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="leauge-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/manage/leauge">
                                    <i class="bi bi-circle"></i><span>Manage</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#team-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Team</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="team-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/manage/team">
                                    <i class="bi bi-circle"></i><span>Manage</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#sports-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Sports</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="sports-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/manage/sports">
                                    <i class="bi bi-circle"></i><span>Manage Sports</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/manage/sportspositions">
                                    <i class="bi bi-circle"></i><span>Manage Position(s)</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#playertag-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Player Tag</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="playertag-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/manage/playertag">
                                    <i class="bi bi-circle"></i><span>Manage</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#player-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Player</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="player-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/manage/player">
                                    <i class="bi bi-circle"></i><span>Manage</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#session-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Session</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="session-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/manage/session">
                                    <i class="bi bi-circle"></i><span>Manage</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#match-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Match</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="match-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/manage/match">
                                    <i class="bi bi-circle"></i><span>Manage</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#scoreboard-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Score Board</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="scoreboard-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/manage/matchlist">
                                    <i class="bi bi-circle"></i><span>Match List</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-journal-text"></i><span>Forms</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="forms-elements.html">
                                    <i class="bi bi-circle"></i><span>Form Elements</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-layouts.html">
                                    <i class="bi bi-circle"></i><span>Form Layouts</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-editors.html">
                                    <i class="bi bi-circle"></i><span>Form Editors</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-validation.html">
                                    <i class="bi bi-circle"></i><span>Form Validation</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-layout-text-window-reverse"></i><span>Tables</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="tables-general.html">
                                    <i class="bi bi-circle"></i><span>General Tables</span>
                                </a>
                            </li>
                            <li>
                                <a href="tables-data.html">
                                    <i class="bi bi-circle"></i><span>Data Tables</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-bar-chart"></i><span>Charts</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="charts-chartjs.html">
                                    <i class="bi bi-circle"></i><span>Chart.js</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-apexcharts.html">
                                    <i class="bi bi-circle"></i><span>ApexCharts</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-echarts.html">
                                    <i class="bi bi-circle"></i><span>ECharts</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-gem"></i><span>Icons</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="icons-bootstrap.html">
                                    <i class="bi bi-circle"></i><span>Bootstrap Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-remix.html">
                                    <i class="bi bi-circle"></i><span>Remix Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-boxicons.html">
                                    <i class="bi bi-circle"></i><span>Boxicons</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-heading">Pages</li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="users-profile.html">
                            <i class="bi bi-person"></i>
                            <span>Profile</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-faq.html">
                            <i class="bi bi-question-circle"></i>
                            <span>F.A.Q</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-contact.html">
                            <i class="bi bi-envelope"></i>
                            <span>Contact</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-register.html">
                            <i class="bi bi-card-list"></i>
                            <span>Register</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-login.html">
                            <i class="bi bi-box-arrow-in-right"></i>
                            <span>Login</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-error-404.html">
                            <i class="bi bi-dash-circle"></i>
                            <span>Error 404</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-blank.html">
                            <i class="bi bi-file-earmark"></i>
                            <span>Blank</span>
                        </a>
                    </li> */}

                </ul>

            </aside>
        </>
    )
}

export default SidebarCopy
